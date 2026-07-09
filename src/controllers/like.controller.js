import mongoose , {isValidObjectId} from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Like} from "../models/like.model.js"
import { Video } from "../models/video.model";

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
    .status(201)
    .json(
        new ApiResponse(
            201,
            {},
            "Video liked successfully"
        )
    )

})

export {
    toggleVideoLike
}

