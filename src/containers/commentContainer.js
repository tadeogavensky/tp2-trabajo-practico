import CommentService from "../services/CommentService.js";
import CommentController from "../controllers/CommentController.js";

const commentService = new CommentService();
const commentController = new CommentController(commentService);

export { commentService, commentController };
