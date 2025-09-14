import type { NextFunction, Request, Response } from "express";
import type { APIResponse } from "../types";

export const errorHandler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log(`Error: ${error}`);

	const response: APIResponse = {
		success: false,
		error:
			process.env.NODE_ENV === "development"
				? error.message
				: "Internal Server Error",
	};

	res.status(500).json(response);
};
