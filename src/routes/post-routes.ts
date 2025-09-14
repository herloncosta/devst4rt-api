import { Router } from "express";
import { PostController } from "../controllers/post-controllers";

export const postsRouter = Router();
const postController = new PostController();

postsRouter.post("/", postController.createPost);
