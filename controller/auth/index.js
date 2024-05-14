const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "aBcDeFgH1234567890!@#$%^&*";

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      // Find user by username
      const user = await prisma.user.findUnique({
        where: { username },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Verify password (without bcrypt)
      if (password !== user.password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          username: user.username,
          user_id: user.user_id,
          role: user.user_role,
        },
        JWT_SECRET
      );

      res.status(200).json({
        auth: {
          token,
          username: user.username,
          user_id: user.user_id,
          role: user.user_role,
        },
        message: "Login Successful",
        userDetails: {
          username: user.username,
          name: user.name,
        },
      });
    } else {
      res.status(400).json({ message: "Username and password are required" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleLogin;
