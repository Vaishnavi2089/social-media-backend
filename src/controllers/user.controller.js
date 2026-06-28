import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JsonWebTokenError } from "jsonwebtoken";

const generateAccessAndRefreshTokens=async(userId)=>
{
    try {
        const user= await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken
        await user.save({ validateBeforeSave:false} )

        return {accessToken,refreshToken}
        
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}



const registerUser= asyncHandler (async (req,res)=>{
    //get user detail from frontend
    //validation-not empty
    //check if the user already exists:username,email
    //check for images and avatars
    //upload them to cloudinary,avatar
    //create user object -create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return response


    //user details
    const{fullName,email,username,password}=req.body
    // console.log("email:",email);
    // console.log({
    //     fullName,
    //     email,
    //     username,
    //     password
    // });

    if (
        [fullName, email, username, password].some(
            (field) => !field || field.trim() === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser= await User.findOne({
            $or:[{ username },{ email }]
         })
    if(existedUser){
            throw new ApiError(409,"User with email or username already exists")
    }
    // console.log(req.files);
    // console.log("Avatar:", req.files?.avatar);
    // console.log("Cover:", req.files?.coverImage); 
    let avatarLocalPath;
    //=req.files?.avatar[0]?.path;
    // const coverImageLocalPath= req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.avatar) && req.files.avatar.length>0){
        avatarLocalPath=req.files.avatar[0].path
    }

    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

     const avatar=await uploadOnCloudinary(avatarLocalPath)
     const coverImage=await uploadOnCloudinary(coverImageLocalPath)

     if (!avatar){
        throw new ApiError(400,"Avatar file is required")
     }

     const user= await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
     })

     const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user")
    }
    
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")

    )
    
    
})
//login user
//compulsory username or email and password
//check for none values of email ,password or username
//is username or email existed match password
//is username or email did not exist return "username or email did not exist kindly sign up"
//access token and refresh token generate
//send cookies


//req.body->data

const loginUser=asyncHandler(async(req,res)=>{

    const {username,email,password}=req.body
    console.log(req.body);
    console.log(username)
    if (!username && !email){
        throw new ApiError(400,"username or email required")
    }
    
    const user= await User.findOne(
       { $or:[{username},{email}]
})
    if(!user){
        throw new ApiError(400,"username or email does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400,"Invalid user password")
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true

    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged in successfully"
        )
    )



})
const logoutUser= asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true

    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out Successfully"))
})

const refreshAccessToken= asyncHandler(async(req,res)=>{
    const incomingAccessToken=req.cookie.accessToken||req.body.refreshToken
    if(!incomingAccessToken){
        throw new ApiError(401,"Unauthorized request")
    }
   try {
     const decodedToken =Jwt.verify(
         incomingAccessToken,process.env.REFRESH_TOKEN_SECRET
     )
     const user=await User.findById(decodedToken?._id)
     if(!user){
         throw new ApiError(401,"Invalid refresh token")
     }
 
     if(incomingAccessToken!==user?.refreshToken){
         throw new ApiError(401,"refresh token is expired or used")
 
     }
     const options={
         httpOnly:true,
         secure:true
     }
     const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id)
     return res
     .status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",newRefreshToken,options)
     .json(
         new ApiResponse(
             200,
             {accessToken,refreshToken:newRefreshToken},
             "Access token refreshed"
         )
     )
   } catch (error) {
     throw new ApiError(401,error?.message||"Invalid refresh Token")
    
   }


})

//password change
const changeCurrentPassoword= asyncHandler(async (req,res)=>{
    const{oldPassword,newPassword}=req.body
    const user=await User.findById(req.user?.id)
    const isPasswordCorrect=await user.isPasswordCorrect(oldPassword)
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old Password")
    }
    req.password=newPassword
    await user.save({validateBeforeSave:false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))
})









export {registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}






