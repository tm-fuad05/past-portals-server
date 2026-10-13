import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const { token } = req?.cookies;
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized access" });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ success: false, message: "Unauthorized access" });
    }
    req.user = decoded;
    next();
  });
}
