import { Comments, User } from "../../models/index.js";

class CommentsService {

  async getCommentById(id) {
    const comment = await Comments.findByPk(id);
    return comment;
  }

  async getCommentsByMovieId(movieId) {
    const comments = await Comments.findAll({
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
    const newComment = await Comments.create({
      userId,
      movieId,
      comment,
    });
    
    // Optional
    const createdComment = await Comments.findByPk(newComment.id, {
        include: [{ model: User, attributes: ['id', 'username', 'firstName', 'lastName'] }]
    });

    return createdComment;
  }


  async updateComment(id, newCommentText) {
    const comment = await Comments.findByPk(id);

    if (!comment) {
      return null;
    }

    await comment.update({ comment: newCommentText });
    return comment;
  }


  async deleteComment(id) {
    const deletedRows = await Comments.destroy({ where: { id } });
    return deletedRows;
  }
}

export default CommentsService;
