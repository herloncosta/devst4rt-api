import type { Author } from "@prisma/client";
import { prisma } from "../app";
import type { CreateAuthorInput, PaginatedResponse } from "./../types/index";

export class AuthorService {
	async createAuthor(data: CreateAuthorInput) {
		try {
			const author = await prisma.author.create({
				data,
				include: {
					posts: true,
				},
			});
			return author;
		} catch (error) {
			throw new Error(`Failed to create author: ${error}`);
		}
	}

	async getAuthorById(id: string) {
		try {
			const author = await prisma.author.findUnique({
				where: { id },
				include: { posts: true },
			});

			if (!author) throw new Error("Author not found!");

			return author;
		} catch (error) {
			throw new Error(`Failed to get author: ${error}`);
		}
	}

	async getAllAuthors(page = 1, limit = 10) {
		try {
			const skip = (page - 1) * limit;

			const [authors, total] = await Promise.all([
				prisma.author.findMany({
					skip,
					take: limit,
					include: { posts: true },
					orderBy: {
						createdAt: "desc",
					},
				}),
				prisma.author.count(),
			]);

			const totalPages = Math.ceil(total / limit);

			return {
				data: authors,
				pagination: {
					page,
					limit,
					total,
					totalPages,
				},
			} as PaginatedResponse<Author>;
		} catch (error) {
			throw new Error(`Failed to get all authors: ${error}`);
		}
	}
}
