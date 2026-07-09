import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"


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

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!playlistId){
        throw new ApiError(400,"Playlist Id is required")
    }
    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid playlist Id")
    }
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    )

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!playlistId){
        throw new ApiError(400,"Playlist Id is required")
    }
    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid Playlist Id")
    }
    
    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video Id")
    }
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    const updatedPlaylist=await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet:{
                videos: videoId
            }
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
            updatedPlaylist,
            "Video added to playlist successfully"
        )
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!playlistId){
        throw new ApiError(400,"Playlist Id is required")
    }
    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid Playlist Id")
    }
    if(!videoId){
        throw new ApiError(400,"Video Id is required")
    }
    if(!mongoose.isValidObjectId(videoId)){
        throw new ApiError(400,"Invalid Video Id")
    }
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404,"Video not found")
    }
    if(!playlist.owner.equals(req.user?._id)){
        throw new ApiError(403,"You are not authorized to remove videos from playlist")
    } 
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull:{
                videos:videoId
            }
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
            updatedPlaylist,
            "Video removed from playlist successfully"
        )
    )
    

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!playlistId){
        throw new ApiError(400,"Playlist Id is required")
    }
    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid Playlist Id")
    }
    
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }
    if(!playlist.owner.equals(req.user?._id)){
        throw new ApiError(403,"You are not authorized to delete the playlist")
    }
    await Playlist.findByIdAndDelete(playlistId)

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "Playlist deleted successfully"
        )
    )
    
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    if(!playlistId){
        throw new ApiError(400,"Playlist Id is required")
    }
    if(!mongoose.isValidObjectId(playlistId)){
        throw new ApiError(400,"Invalid Playlist Id")
    }
    if(!name && !description){
        throw new ApiError(400,"Nothing to update")
    }
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }
    if(!playlist.owner.equals(req.user._id)){
        throw new ApiError(403,"You are not authorized to update this playlist")
    }
    const updateFields = {}
    
    if(name) {
        updateFields.name=name
    }
    if(description){
        updateFields.description=description
    }
    
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
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
            updatedPlaylist,
            "Playlist updated successfully"

        )
    )
})
export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}