import { Router } from "express";
import { getVideoComments,addComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()
//get all comment of a video
// router.route("/:videoId").get(getVideoComments)
// //add comments to a video
// router.route("/:videoId").post(verifyJWT,addComment)
router
.route("/:videoId")
.get(getVideoComments)
.post(verifyJWT,addComment)  //avoiding repetition






export default router
