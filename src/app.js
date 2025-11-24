import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const ALLOWED_ORIGINS = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions));

// Routers
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Peli API hit! 📽️🍿");
});

export default app;
