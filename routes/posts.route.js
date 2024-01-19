import express from "express";
import {
  postController,
  createPostController,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/post.controller.js";
const router = express.Router();
//routes
router.get("/", postController);
router.post("/", createPostController);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);
export default router;
