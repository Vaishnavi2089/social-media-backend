import { Router } from "express";
import { getVideoComments,addComment, updateComment, deleteComment } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()
router
.route("/:videoId")
.get(getVideoComments)
.post(verifyJWT,addComment)  //avoiding repetition

router
.route("/:commentId")
.patch(verifyJWT,updateComment)
.delete(verifyJWT,deleteComment)







export default router
