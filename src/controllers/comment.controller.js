import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Video} from "../models/video.model.js"
const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!videoId) {
        throw new ApiError(400, "Video Id is missing");
    }

    if (!mongoose.isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid Video Id");
    }

    const comments = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: (Number(page) - 1) * Number(limit)
        },
        {
            $limit: Number(limit)
        },
        {
            $project: {
                content: 1,
                owner: 1,
                createdAt: 1
            }
        }
    ]);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comments,
            "Comments fetched successfully"
        )
    );
});

const addComment = asyncHandler(async (req, res) => {
    const {videoId}=req.params
    if(!videoId){
        throw new ApiError(400,"Missing video id")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video id")
    }
    const {content}=req.body
    if(!content?.trim()){   //avoids empty content
        throw new ApiError(400,"Content is missing")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    const comment= await Comment.create(
        {
            content:content.trim(),//trim unnecessary spaces
            video:videoId,
            owner:req.user._id
        }
    )
    if(!comment){ //adding this additionally to know where the code breaks
        throw new ApiError(500,"failed to add comment")
    }
    return res
    .status(201)
    .json(new ApiResponse(
        201,
        comment,
        "Comment added successfully"
    ))


});
const updateComment=asyncHandler(async(req,res)=>{
    //we need video id and logged in user (also check their validity)
    //check if the logged in user is the verified owner of that comment 
    //update comment content
    //updatedAt
    //response of updated comment

    const {commentId} =req.params
    if(!commentId){
        throw new ApiError(400,"Comment id not found")
    }
    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid comment id")
    }
    const comment= await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404,"Comment not found")
    }
    if(!comment.owner?.equals(req.user?._id)){
        throw new ApiError(403,"You are not authorized to update this comment")
    }
    const {content}=req.body
    if(!content?.trim()){
        throw new ApiError(400,"Content is required")
    }
    comment.content=content.trim()
    await comment.save()
    


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            comment,
            "Comment updated successfully"
        )
    )

    
})
const deleteComment=asyncHandler(async(req,res)=>{
    //get comment id and verify
    //owner of video and owner of comment can delete the comment 
    const {commentId}=req.params
    if(!commentId){
        throw new ApiError(400,"Comment id missing")
    }
    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid Comment id")
    }
    const comment =await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404,"Comment not found")
    }
    const video = await Video.findById(comment.video)
    if(!video){
        throw new ApiError(404,"Associated video not found")
    }
    const isCommentOwner = comment.owner.equals(req.user?._id)
    const isVideoOwner= video.owner.equals(req.user?._id)
    if(!isCommentOwner && !isVideoOwner){
        throw new ApiError(403,"You are not authorized to delete this comment")
    }
    await comment.deleteOne()
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            null,
            "Comment deleted successfully"
        )
    )
})



export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
    
    }