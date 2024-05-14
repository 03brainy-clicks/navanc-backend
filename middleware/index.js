const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();
const JWT_SECRET = "aBcDeFgH1234567890!@#$%^&*";

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authorization.split(" ")[1];
    // Verify the JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({
      where: {
        user_id: decoded.user_id,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Call the next middleware
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
