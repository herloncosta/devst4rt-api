import type { Request, Response } from "express";
import type { APIResponse } from "../types";
import { AuthorService } from "../services/author-services";

const authorService = new AuthorService();

export class AuthorController {
	async createAuthor(req: Request, res: Response) {
		try {
			const author = await authorService.createAuthor(req.body);
			const response: APIResponse = {
				success: true,
				data: author,
				message: "Author created successfully!",
			};

			res.status(201).json(response);
		} catch (error) {
			const response: APIResponse = {
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to create author!",
			};

			res.status(400).json(response);
		}
	}
}
