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

	async getAuthor(req: Request, res: Response) {
		try {
			const { id } = req.params;
			if (!id) throw new Error("Author id is required!");

			const author = await authorService.getAuthorById(id);
			const response: APIResponse = {
				success: true,
				data: author,
			};

			res.status(200).json(response);
		} catch (error) {
			const response: APIResponse = {
				success: false,
				error: error instanceof Error ? error.message : "Failed to get author!",
			};

			res.status(400).json(response);
		}
	}

	async getAllAuthors(req: Request, res: Response) {
		try {
			const page = Number.parseInt(req.query.page as string) || 1;
			const limit = Number.parseInt(req.query.limit as string) || 10;

			const result = await authorService.getAllAuthors(page, limit);

			const response: APIResponse = {
				success: true,
				data: result.data,
				message: "Authors retrieved successfully",
			};

			res.status(200).json({
				...response,
				pagination: result.pagination,
			});
		} catch (error) {
			const response: APIResponse = {
				success: false,
				error:
					error instanceof Error ? error.message : "Failed to get authors!",
			};

			res.status(500).json(response);
		}
	}
}
