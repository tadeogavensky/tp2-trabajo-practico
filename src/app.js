import express from "express";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use("/api", routes);

app.use("/", (req, res) => {
  res.send("Peli API hit! 📽️🍿");
});

export default app;
