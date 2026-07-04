import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

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


export {
    getAllVideos
}