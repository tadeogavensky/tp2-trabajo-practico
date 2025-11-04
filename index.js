import app from "./src/app.js";
import "dotenv/config";
import connection from "./src/database/connection.js";

const PORT = process.env.EXPRESS_PORT || 3000;

await connection.sync({ force: false });

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
