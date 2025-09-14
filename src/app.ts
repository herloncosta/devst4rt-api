import { PrismaClient } from "@prisma/client";
import express from "express";
import type { Application } from "express";
import { errorHandler } from "./utils/error-handler";
import { postsRouter } from "./routes/post-routes";
import { authorRouter } from "./routes/author-routes";

export const app: Application = express();
export const prisma = new PrismaClient();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/author", authorRouter);
app.use("/api/v1/posts", postsRouter);

app.get("/api/v1/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});

app.use(errorHandler);
