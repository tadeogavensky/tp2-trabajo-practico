import app from "./src/app.js";
import "dotenv/config";
import connection from "./src/database/connection.js";

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

async function startServer() {
  try {
    await connection.authenticate();
    if (process.env.NODE_ENV === "development") {
      await connection.sync({ alter: true });
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

startServer();
