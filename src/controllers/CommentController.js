import CommentService from '../services/commentsService.js';

const commentService = new CommentService();

class CommentController {
    
    // OBTENER COMENTARIOS POR PELÍCULA (GET /api/movies/:movieId/comments)
    async getCommentsByMovie(req, res, next) {
        try {
            const { movieId } = req.params;
            
            const comments = await commentService.getCommentsByMovieId(parseInt(movieId, 10));

            return res.status(200).json(comments);

        } catch (error) {
            next(error); 
        }
    }

    // CREAR NUEVO COMENTARIO (POST /api/comments)
    async createComment(req, res, next) {
        try {
            // userId viene del usuario autenticado (asumido: req.user.id)
            const userId = req.user.id; 
            const { movieId, comment } = req.body; 

            if (!movieId || !comment) {
                 return res.status(400).json({ message: "Faltan datos requeridos (movieId, comment)." });
            }

            const newComment = await commentService.createComment({ 
                userId, 
                movieId, 
                comment 
            });

            console.log(`✅ Comentario ID ${newComment.id} subido correctamente por User ID ${userId} a Movie ID ${movieId}`);

            return res.status(201).json(newComment); // 201 Created

        } catch (error) {
            next(error);
        }
    }
    
    // ACTUALIZAR COMENTARIO (PUT /api/comments/:commentId)
    // El middleware isCommentAuthor verifica los permisos antes de llegar aquí.
    async updateComment(req, res, next) {
        try {
            const { commentId } = req.params;
            const { comment } = req.body;

            if (!comment) {
                return res.status(400).json({ message: "Nuevo texto de comentario requerido." });
            }

            const updatedComment = await commentService.updateComment(parseInt(commentId, 10), comment);

            // Sequelize podría no devolver el autor incluido, por lo que devolvemos solo lo que se actualizó.
            return res.status(200).json(updatedComment); 

        } catch (error) {
            next(error);
        }
    }

    // ELIMINAR COMENTARIO (DELETE /api/comments/:commentId)
    // El middleware isCommentAuthor verifica los permisos antes de llegar aquí.
    async deleteComment(req, res, next) {
        try {
            const { commentId } = req.params;

            const deletedRows = await commentService.deleteComment(parseInt(commentId, 10));

            if (deletedRows === 0) {
                 return res.status(404).json({ message: "Comentario no encontrado para eliminar." });
            }

            return res.status(204).send(); // 204 No Content

        } catch (error) {
            next(error);
        }
    }
}

export default new CommentController();