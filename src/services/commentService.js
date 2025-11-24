import { Comment, User } from "../models/index.js";

class CommentService {
  getCommentById = async (id) => {
    const comment = await Comment.findByPk(id);
    return comment;
  };

  getCommentsByMovieId = async (movieId) => {
    const comments = await Comment.findAll({
      where: { movieId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    return comments;
  };

  createComment = async ({ userId, movieId, comment }) => {
    const newComment = await Comment.create({
      userId,
      movieId,
      comment,
    });

    const createdComment = await Comment.findByPk(newComment.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "firstName", "lastName"],
        },
      ],
    });

    return createdComment;
  };

  updateComment = async (id, newCommentText) => {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return null;
    }

    await comment.update({ comment: newCommentText });
    return comment;
  };

  deleteComment = async (id) => {
    const deletedRows = await Comment.destroy({ where: { id } });
    return deletedRows;
  };
}

export default CommentService;
