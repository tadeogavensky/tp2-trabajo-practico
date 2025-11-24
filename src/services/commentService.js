import { Comment, User } from "../models/index.js";

class CommentService {

  async getCommentById(id) {
    const comment = await Comment.findByPk(id);
    return comment;
  }

  async getCommentsByMovieId(movieId) {
    const comments = await Comment.findAll({
      where: { movieId },
      include: [
        {
          model: User,
          attributes: ['id', 'username', 'firstName', 'lastName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    return comments;
  }

  async createComment({ userId, movieId, comment }) {
    const newComment = await Comment.create({
      userId,
      movieId,
      comment,
    });
    
    // Optional
    const createdComment = await Comment.findByPk(newComment.id, {
        include: [{ model: User, attributes: ['id', 'username', 'firstName', 'lastName'] }]
    });

    return createdComment;
  }


  async updateComment(id, newCommentText) {
    const comment = await Comment.findByPk(id);

    if (!comment) {
      return null;
    }

    await comment.update({ comment: newCommentText });
    return comment;
  }


  async deleteComment(id) {
    const deletedRows = await Comment.destroy({ where: { id } });
    return deletedRows;
  }
}

export default CommentService;
