import { PrismaClient } from '@prisma/client';
import express from "express";
import type { Application } from "express";

export const app: Application = express();
export const prisma = new PrismaClient();

app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});