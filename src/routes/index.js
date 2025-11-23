import express from "express";

import usersRouter from "./usersRouter.js";
import moviesRouter from "./moviesRouter.js";
import watchlistRouter from "./watchlistRouter.js";
import favoritesRouter from "./favoritesRouter.js";
import commentsRouter from "./commentsRouter.js";
import ratingsRouter from "./ratingsRouter.js";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/movies", moviesRouter);
router.use("/watchlist", watchlistRouter);
router.use("/favorites", favoritesRouter);
router.use("/comments", commentsRouter);
router.use("/ratings", ratingsRouter);
router.get("/", (req, res) => {res.send("API root OK");});

export default router;