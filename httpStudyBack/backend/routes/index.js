import express from "express";
import postApi from "../entitys/post/post.api.js";

const router = express.Router();

router.use("/post", postApi);

export default router;
