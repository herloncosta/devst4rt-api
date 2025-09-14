import { prisma } from "../app";
import type { CreatePostInput } from "../types";

export class PostService {
	async createPost(data: CreatePostInput) {
		try {
			const post = await prisma.post.create({
				data,
				include: {
					author: true,
				},
			});
			return post;
		} catch (error) {
			console.log(error);
			throw new Error(`Failed to create post. Error: ${error}`);
		}
	}
}
