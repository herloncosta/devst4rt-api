import { Router } from "express";
import { AuthorController } from "../controllers/author-controllers";

export const authorRouter = Router();
const authorController = new AuthorController();

authorRouter.post("/", authorController.createAuthor);
authorRouter.get("/", authorController.getAllAuthors);
authorRouter.get("/:id", authorController.getAuthor);
