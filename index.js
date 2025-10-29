import app from "./src/app.js";
import "dotenv/config";
import connection from "./src/database/connection.js";

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});

try {
  await connection.authenticate();
  console.log("Conexión establecida correctamente.");
} catch (error) {
  console.error("Error al conectar:", error);
} finally {
  await connection.close();
}
