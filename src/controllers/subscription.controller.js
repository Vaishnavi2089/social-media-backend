import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import {User} from "../models/user.model.js"

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

export {toggleSubscription}