import { Router } from "express";
import CommentController from "../controllers/CommentController.js"; 
import { authenticate } from "../middlewares/userMiddleware.js"; 
import { isCommentAuthor } from "../middlewares/commentMiddleware.js"; 

const commentsRouter = Router();

// --- 2. CREAR Nuevo Comentario (POST) ---
// Ruta: POST /api/comments
// Requiere: Autenticación (para obtener req.user.id)
commentsRouter.post(
    "/", 
    authenticate, 
    CommentController.createComment
);

// --- 3. ACTUALIZAR Comentario (PUT) ---
// Ruta: PUT /api/comments/:commentId
// Requiere: Autenticación Y Autorización (solo el autor puede editar)
commentsRouter.put(
    "/:commentId", 
    authenticate, 
    isCommentAuthor,
    CommentController.updateComment
);

// --- 4. ELIMINAR Comentario (DELETE) ---
// Ruta: DELETE /api/comments/:commentId
// Requiere: Autenticación Y Autorización (solo el autor puede eliminar)
commentsRouter.delete(
    "/:commentId", 
    authenticate, 
    isCommentAuthor, // Verifica que req.user.id == comment.userId
    CommentController.deleteComment
);

export default commentsRouter;