import express from "express";
import usersRouter from "./routes/usersRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/users", usersRouter);

app.use("/", (req, res) => {
  res.send("Peli API hit! 📽️🍿");
});

export default app;
