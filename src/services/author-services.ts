import { prisma } from "../app";
import type { CreateAuthorInput } from "./../types/index";

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
}
