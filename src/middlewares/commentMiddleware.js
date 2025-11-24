import COMMENT_ERRORS from "../errors/comment.js";
import { commentService } from "../containers/commentContainer.js";

export const isCommentAuthor = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const userId = req.user.id;

    if (!commentId) {
      return res
        .status(400)
        .json({ message: COMMENT_ERRORS.COMMENT_ID_REQUIRED });
    }

    const comment = await commentService.getCommentById(
      parseInt(commentId, 10)
    );

    if (!comment) {
      return res
        .status(404)
        .json({ message: COMMENT_ERRORS.COMMENT_NOT_FOUND });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({
        message: COMMENT_ERRORS.NOT_COMMENT_AUTHOR,
      });
    }

    next();
  } catch (error) {
    console.error("Error en isCommentAuthor:", error);
    res.status(500).json({ message: COMMENT_ERRORS.INTERNAL_ERROR });
  }
};

export const validateNewComment = (req, res, next) => {
  const { comment } = req.body;
  const { movieId } = req.params;

  if (!movieId) {
    return res.status(400).json({ message: COMMENT_ERRORS.MOVIE_ID_REQUIRED });
  }

  if (!comment || comment.trim() === "") {
    return res
      .status(400)
      .json({ message: COMMENT_ERRORS.COMMENT_TEXT_REQUIRED });
  }

  next();
};


export const validateCommentIdParam = (req, res, next) => {
  const { commentId } = req.params;

  if (!commentId) {
    return res
      .status(400)
      .json({ message: COMMENT_ERRORS.COMMENT_ID_REQUIRED });
  }

  next();
}