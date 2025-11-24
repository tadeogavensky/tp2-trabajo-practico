import Comment  from "../models/Comment.js"

import CommentService from '../services/commentService.js';

const commentService = new CommentService();

/**
 * verify if user is author
 */
export const isCommentAuthor = async (req, res, next) => {
    try {
        const { commentId } = req.params; 
        
        const userId = req.user.id; 

        if (!commentId) {
            return res.status(400).json({ message: "ID de comentario requerido." });
        }

        const comment = await commentService.getCommentById(parseInt(commentId, 10));

        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado." });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: "Acceso denegado. Solo el autor puede modificar o eliminar este comentario." });
        }

        // author? continue
        next();
    } catch (error) {
        console.error('Error en isCommentAuthor:', error);
        res.status(500).json({ message: "Error interno del servidor al verificar la autoría." });
    }
};

// NOTA: Asegúrate de que tengas otro middleware 'protect' o 'isAuthenticated' 
// que se ejecute ANTES de este para poblar req.user.id