const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    console.log("⚠️ No se envió header Authorization");
    const error = new Error("Not Authenticated.");
    error.statusCode = 401;
    throw error; // ❌ corta el flujo y lo maneja el middleware global de errores
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  ("");
  console.log("🪶 Token recibido:", token);
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId; //esto es string... el decodedToken.userId pq en el jwt.sign solo guarda string
  next();
};
