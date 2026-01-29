const { verifyToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  try {
    const token = authHeader.split(" ")[1];
    req.user = verifyToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
