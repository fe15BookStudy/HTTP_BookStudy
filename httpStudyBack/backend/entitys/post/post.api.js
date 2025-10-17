import express from "express";
import postService from "./post.service.js";

const router = express.Router();

// 게시글 조회
router.get("/", postService.getPosts);

// 특정 게시글 조회
router.get("/:id", postService.getPostById);

// 게시글 쓰기
router.post("/", postService.createPost);

// 게시글 수정
router.put("/:id", postService.updatePost);

// 게시글 삭제
router.delete("/:id", postService.deletePost);

export default router;
