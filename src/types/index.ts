// biome-ignore lint/suspicious/noExplicitAny:
export interface APIResponse<T = any> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

export interface CreateAuthorInput {
	name: string;
	surname: string;
	profilePhoto?: string;
}

export interface CreatePostInput {
	title: string;
	content: string;
	category: string;
	banner?: string;
	authorId: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}
