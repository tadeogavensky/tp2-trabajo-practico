import COMMENT_ERRORS from "../errors/comment.js";

class CommentController {
  constructor(commentService) {
    this.commentService = commentService;
  }

  getCommentsByMovie = async (req, res) => {
    try {
      const { movieId } = req.params;

      const comments = await this.commentService.getCommentsByMovieId(
        parseInt(movieId, 10)
      );
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  createComment = async (req, res) => {
    try {
      const userId = req.user.id;
      const { movieId, comment } = req.body;

      const newComment = await this.commentService.createComment({
        userId,
        movieId,
        comment,
      });

      return res.status(201).json(newComment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  updateComment = async (req, res) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;

      const updatedComment = await this.commentService.updateComment(
        parseInt(commentId, 10),
        comment
      );

      return res.status(200).json(updatedComment);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  deleteComment = async (req, res) => {
    try {
      const { commentId } = req.params;

      const deletedRows = await this.commentService.deleteComment(
        parseInt(commentId, 10)
      );

      if (deletedRows === 0) {
        return res
          .status(404)
          .json({ message: COMMENT_ERRORS.COMMENT_NOT_FOUND });
      }

      return res.status(204).json({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}

export default CommentController;
