import { Router } from "express";
import CommentController from "../controllers/CommentController.js"; 
import { authenticate } from "../middlewares/userMiddleware.js"; 
import { isCommentAuthor } from "../middlewares/commentMiddleware.js"; 
import CommentService from "../services/commentService.js";

const commentRouter = Router();
const commentController = new CommentController(new CommentService());

commentRouter.post(
  "/", 
  authenticate, 
  (req, res, next) => commentController.createComment(req, res, next)
);

commentRouter.put(
  "/:commentId", 
  authenticate, 
  isCommentAuthor,
  (req, res, next) => commentController.updateComment(req, res, next)
);

commentRouter.delete(
  "/:commentId", 
  authenticate, 
  isCommentAuthor, // Verifica que req.user.id == comment.userId
  (req, res, next) => commentController.deleteComment(req, res, next)
);

export default commentRouter;
