import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js"

const getAllVideos = asyncHandler(async(req,res)=>{
    const {page=1,limit=10,query,sortBy,sortType,userId}=req.query
    const pageNumber=Number(page)
    const limitNumber=Number(limit)
    if(Number.isNaN(pageNumber)){
        throw new ApiError(400,"page should be a valid number")
    }
    if(Number.isNaN(limitNumber)){
        throw new ApiError(400,"limit should be a valid number")
    }
    if(pageNumber<1){
        throw new ApiError(400,"Page should be greater than or equal to 1")
    }
    if(limitNumber<1){
        throw new ApiError(400,"limit should be greater than or equal to 1")
    }
    if(sortType){
        if(sortType !="asc" && sortType!="desc"){
            throw new ApiError(400,"Invalid Sort type")
        }
    }
    if(sortBy){
        if(sortBy!="views" && sortBy!="createdAt" && sortBy!="title" && sortBy!="duration" ){
            throw new ApiError(400,"Invalid sortBy")
        }
    }
    if(userId){
        if(!mongoose.isValidObjectId(userId)){
            throw new ApiError(400,"Invalid user Id")
        }
    }
    const matchStage={
        isPublished:true
    }
    if(userId){
        matchStage.owner = new mongoose.Types.ObjectId(userId)
    }
    if(query){
        matchStage.$text={
            $search:query
        }
    }
    const sortStage = {};

    if (query) {
        sortStage.score = { $meta: "textScore" };
    }

    if (sortBy) {
        sortStage[sortBy] = sortType === "asc" ? 1 : -1;
    } 
    else {
    sortStage.createdAt = -1;
    }
    const pipeline = [
        {
            $match: matchStage
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
                            _id:0,
                            avatar: 1,
                            username: 1,
                            fullName: 1
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
        }
    ];
    
    if (query) {
        pipeline.push({
            $addFields: {
                score: {
                    $meta: "textScore"
                }
            }
        });
    }
    
    pipeline.push(
        {
            $project: {
                videoFile: 1,
                thumbnail: 1,
                title: 1,
                description: 1,
                duration: 1,
                views: 1,
                createdAt: 1,
                owner: 1,
                
            }
        },
        {
            $sort: sortStage
        }
    );
    
    const aggregate = Video.aggregate(pipeline);
    
    const options = {
        page: pageNumber,
        limit: limitNumber,
        customLabels: {
            docs: "videos"
        }
    };
    
    const videos = await Video.aggregatePaginate(aggregate, options);
    
    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Videos fetched successfully"
        )
    );
    
})

const publishAVideo = asyncHandler(async (req, res) => {
    const {title,description} = req.body
    if(!title?.trim() || !description?.trim() )
    {
        throw new ApiError(400,"Title and Description are required")
    }
    const videoLocalPath=req.files?.videoFile?.[0]?.path 
    const thumbnailLocalPath=req.files?.thumbnail?.[0]?.path
    if(!videoLocalPath){
        throw new ApiError(400,"Video file is required")
    }
    if(!thumbnailLocalPath){
        throw new ApiError(400,"Thumbnail is required")
    }
    const uploadedVideo = await uploadOnCloudinary(videoLocalPath)
    const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath)

    if (!uploadedVideo) {
        throw new ApiError(500, "Failed to upload video")
    }

    if (!uploadedThumbnail) {
        throw new ApiError(500, "Failed to upload thumbnail")
    }
    const video = await Video.create({
        videoFile: uploadedVideo.url,
        thumbnail: uploadedThumbnail.url,
        title,
        description,
        duration: uploadedVideo.duration,
        owner: req.user._id,
        isPublished: true
})
    if (!video) {
        throw new ApiError(500, "Failed to publish video");
    }
    return res.status(201).json(
        new ApiResponse(
            201,
            video,
            "Video published successfully"
        )
    )
})
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video Id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    await Video.findByIdAndUpdate(
        videoId,
        {
            $inc:{
                views:1
            },
        },{new:true}
    )
    const videoById = await Video.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(videoId)
            }

        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                as:"owner",
                pipeline:[
                    
                    {
                        $project:{
                            fullName:1,
                            avatar:1,
                            username:1,

                        }
                    }
                ]
            }
        },
        {
            $addFields:{
                owner:{
                    $first:"$owner"
                }
            }
        },
        {
           $project:{
            videoFile:1,
            thumbnail:1,
            title:1,
            description:1,
            duration:1,
            views:1,
            owner:1
           } 
        }
])
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            videoById,
            "Video fetched successfully"
        )
    )
})
const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    const {title,description}=req.body
    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid video Id")
    }
    const video= await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    if(video.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"You are not authorized to update this video")
    }
    if(!title && !description && !req.file){
        throw new ApiError(400,"Nothing to update")
    }
    const updateFields={}
    if(title?.trim()){
        updateFields.title=title.trim()
    }
    if(description?.trim()){
        updateFields.description=description.trim()
    }
    if(req.file?.path){
        const thumbnail= await uploadOnCloudinary(req.file.path)
        if(!thumbnail?.url){
            throw new ApiError(500,"Failed to upload thumbnail")
        }
        updateFields.thumbnail=thumbnail.url
    }
    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set:updateFields
        },
        {
            new:true
        }
    )
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            updatedVideo,
            "Video updated successfully"
        )
    )

})
const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video Id")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    if(video.owner.toString()!==req.user?._id.toString()){
        throw new ApiError(403,"You are not authorized to delete this video")
    }
    //delete video file from cloudinary
    const videoDeleteResult = await deleteFromCloudinary(video.videoFile);

    if (
        !videoDeleteResult ||
        (videoDeleteResult.result !== "ok" &&
            videoDeleteResult.result !== "not found")
    ) {
        throw new ApiError(500, "Failed to delete video file");
    }

    // Delete thumbnail from Cloudinary
    const thumbnailDeleteResult = await deleteFromCloudinary(video.thumbnail);

    if (
        !thumbnailDeleteResult ||
        (thumbnailDeleteResult.result !== "ok" &&
            thumbnailDeleteResult.result !== "not found")
    ) {
        throw new ApiError(500, "Failed to delete thumbnail");
    }

    // Delete video document
    await video.deleteOne();
    
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Video deleted successfully"
        )
    )
    
})



export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo
}