import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

interface Payload {
  email: string;
}
export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const { token } = req?.cookies;
  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized access" });
  }

  jwt.verify(
    token,
    secret,
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
      if (err) {
        return res
          .status(401)
          .send({ success: false, message: "Unauthorized access" });
      }

      req.user = decoded as Payload;
      next();
    },
  );
}
