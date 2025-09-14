import { PrismaClient } from "@prisma/client";
import express from "express";
import type { Application } from "express";
import { errorHandler } from "./utils/error-handler";

export const app: Application = express();
export const prisma = new PrismaClient();

app.use(errorHandler);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});
