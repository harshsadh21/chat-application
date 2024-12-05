import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .ststus(401)
        .json({ error: "Unauthroized - no token provided " });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.ststus(401).json({ error: "Unauthroized - Invalid token " });
    }
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.ststus(401).json({ error: "user not found " });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
