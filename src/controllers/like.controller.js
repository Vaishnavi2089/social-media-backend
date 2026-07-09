import mongoose , {isValidObjectId} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Like} from "../models/like.model.js"
import { Video } from "../models/video.model";
import { Tweet } from "../models/tweet.model.js";

const toggleVideoLike = asyncHandler(async(req,res)=>{
    const {videoId} = req.params
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
    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: req.user._id
    })
    if(existingLike){
        await existingLike.deleteOne()

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Video unliked successfully"
            )
        )
    }
    await Like.create({
        video: videoId,
        likedBy: req.user._id
    })
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Video liked successfully"
        )
    )

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    if(!mongoose.isValidObjectId(commentId)){
        throw new ApiError(400,"Invalid Comment Id"
        )
    }
    const comment = await Comment.findById(commentId)
    if(!comment){
        throw new ApiError(404,"Comment not found")
    }
    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: req.user._id
    })
    if(existingLike){
        await existingLike.deleteOne()

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Comment unliked successfully"
                )
            )
    }
    await Like.create({
        comment: commentId,
        likedBy: req.user._id
    })
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Comment liked successfully"
            )
        )

})


const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    if(!mongoose.isValidObjectId(tweetId)){
        throw new ApiError(400,"Invalid tweet Id")
    }
    const tweet = await Tweet.findById(tweetId)
    if(!tweet){
        throw new ApiError(404,"Tweet not found")
    }
    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: req.user._id
    })
    if(existingLike){
        await existingLike.deleteOne()
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Tweet unliked successfully"
                )
            )
    }
    await Like.create({
        tweet: tweetId,
        likedBy: req.user._id
    })
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Tweet liked successfully"
            )

        )

}
)

export {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike
}

