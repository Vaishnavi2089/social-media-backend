import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!channelId){
        throw new ApiError(400,"Channel Id is required")
    }
    if(!mongoose.isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid Channel Id")
    }
    const channel = await User.findById(channelId)
    if(!channel){
        throw new ApiError(404,"Channel not found")
    }
    if(channelId === req.user._id.toString()){
        throw new ApiError(400,"You cannot subscribe to yourself")
    }

    const channelSubscription = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user._id
    })
    if(channelSubscription){
        await channelSubscription.deleteOne()
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Channel unsubscribed successfully"
            )
        )
    }
    await Subscription.create({
        channel: channelId,
        subscriber: req.user._id

    })
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Channel subscribed successfully"
        )
    )
})

const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    if(!channelId){
        throw new ApiError(400,"Channel Id is required")
    }
    if(!mongoose.isValidObjectId(channelId)){
        throw new ApiError(400,"Invalid Channel Id")
    }
    const channel = await User.findById(channelId);

    if (!channel) {
        throw new ApiError(404, "Channel not found");
}
    const subscribers = await Subscription.aggregate(
        [
            {
                $match:{
                    channel: new mongoose.Types.ObjectId(channelId) 
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"subscriber",
                    foreignField:"_id",
                    as: "subscriber",
                    pipeline:[
                        {
                            $project:{
                                username:1,
                                avatar:1,
                                fullName:1
                            }
                        }
                    ]
                }
            },
            {
                $addFields:{
                    subscriber: {
                        $first: "$subscriber"
                    }
                }
            }
        ]
    )
    return res
.status(200)
.json(
    new ApiResponse(
        200,
        subscribers,
        "Channel subscribers fetched successfully"
    )
)
})

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if(!subscriberId){
        throw new ApiError(400,"Subscriber Id is required")
    }
    if(!mongoose.isValidObjectId(subscriberId)){
        throw new ApiError(400,"Invalid Subscriber Id")
    }
    const subscription = await Subscription.aggregate(
        [
            {
                $match:{
                    subscriber: new mongoose.Types.ObjectId(subscriberId)
                }
            },
            {
                $sort:{
                    createdAt:-1
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as : "subscription",
                    pipeline:[
                        {
                            $project:{
                                username:1,
                                fullName:1,
                                avatar:1
                            }
                        }

                    ]

                }
            },
            {
                $addFields: {
                    subscription: {
                        $first: "$subscription"
                    }
                }
            }
        ]
    )
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            subscription,
            "Subscribed channel fetched successfully"
        )
    )

})



export {toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}