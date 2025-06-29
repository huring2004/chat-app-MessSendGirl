import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(400)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    //decoded chứa {userId, password,...}
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    if (!decoded) {
      return res.status(400).json({ message: "Unauthorized - Invalid Token" });
    }
    // select ngoai trừ password
    const user = await User.findById(decoded.userId).select("-password"); 

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    req.user = user; //gán user của req = user
    next();
  } catch (error) {
    console.log("Error in protectRout Middleware ", error);
    return res.status(400).json({ message: "Inernal Server Error" });
  }
};
