import type { Request, Response } from "express";
import type { APIResponse } from "../types";
import { PostService } from "../services/post-services";

const postService = new PostService();

export class PostController {
	async createPost(req: Request, res: Response) {
		try {
			const post = await postService.createPost(req.body);
			const response: APIResponse = {
				success: true,
				data: post,
				message: "Post created successfully!",
			};

			res.status(201).json(response);
		} catch (error) {
			const response: APIResponse = {
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to create post!",
			};

			res.status(400).json(response);
		}
	}
}
