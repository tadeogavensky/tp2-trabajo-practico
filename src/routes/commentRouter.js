import { Router } from "express";
import { authenticate } from "../middlewares/userMiddleware.js";
import {
  isCommentAuthor,
  validateCommentIdParam,
  validateNewComment,
} from "../middlewares/commentMiddleware.js";
import { commentController } from "../containers/commentContainer.js";

const commentRouter = Router();

commentRouter.get("/test", (req, res) => {
  res.send("Comment router hit!");
});

commentRouter.post(
  "/:movieId",
  authenticate,
  validateNewComment,
  commentController.createComment
);

commentRouter.put(
  "/:commentId",
  authenticate,
  validateCommentIdParam,
  isCommentAuthor,
  commentController.updateComment
);

commentRouter.delete(
  "/:commentId",
  authenticate,
  isCommentAuthor,
  commentController.deleteComment
);

export default commentRouter;
