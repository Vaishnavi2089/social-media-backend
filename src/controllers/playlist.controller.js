import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if(!name?.trim()){
        throw new ApiError(400," Playlist name is required")
    }
    const playlist = await Playlist.create(
    {   name,
        description,
        owner: req.user?._id
    }
    )
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            playlist,
            "Playlist created successfully"

        )
    )
})


const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    if(!userId){
        throw new ApiError(400,"User Id is required")
    }
    if(!mongoose.isValidObjectId(userId)){
        throw new ApiError(400,"Invalid User Id")
    }
    const playlists = await Playlist.findById(
        {
            owner:userId
        }
    )
    if(!playlists){
        throw new ApiError(404,"Playlist not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlists,
            " User Playlists fetched successfully "
        )
    )

    
})
export {
    createPlaylist,
    getUserPlaylists
}