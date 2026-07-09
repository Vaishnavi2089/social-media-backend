import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subscription } from "../models/subscription.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";


const getChannelStats = asyncHandler(async(req,res)=>{
    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized");
    }
    const channelObjectId = new mongoose.Types.ObjectId(req.user._id);

    const channelStatsResult = await Video.aggregate(
        [
            {
                $match:{
                    owner: channelObjectId
                }
            },
            {
                $lookup:{
                    from:"likes",
                    localField:"_id",
                    foreignField:"video",
                    as:"likes"

                }
            },
            {
                $group:{
                    _id:"$owner",
                    totalVideos:{
                        $sum:1
                    },
                    totalViews:{
                        $sum:"$views"
                    },
                    totalLikes:{
                        $sum:{
                            $size:"$likes"
                        }
                    }
                }
            }

        ]
    )
    const totalSubscribers = await Subscription.countDocuments(
        {
            channel : channelObjectId
        }
    )
    const channelStats = channelStatsResult[0] || {}
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {
                totalVideos: channelStats.totalVideos ?? 0,
                totalViews: channelStats.totalViews ?? 0,
                totalLikes:channelStats.totalLikes ?? 0,
                totalSubscribers
            },
            "Channel stats fetched successfully"
        )
    )

})

const getChannelVideos = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId || req.user?._id
    if(!channelId){
        throw new ApiError(401,"Unauthorized")
    }
    if(!mongoose.isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid channel Id")
    }
    const query = {
        owner: channelId
    }
    if(req.params.channelId){
        query.isPublished = true
    }
    const videos = await Video.find(query).sort({createdAt: -1})

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            videos,
            "Channel videos fetched successfully"
        )
    )
})


export {
    getChannelStats,
    getChannelVideos
}