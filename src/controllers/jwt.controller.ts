import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

function tokenCreate(req: Request, res: Response) {
  const user = req.body;
  const secret = process.env.ACCESS_TOKEN_SECRET!;
  const token = jwt.sign(user, secret, {
    expiresIn: "5h",
  });
  res
    .cookie("token", token, cookieOptions)
    .send({ success: true, message: "Successfully Logged in!" });
}

function tokenRemove(req: Request, res: Response) {
  res.clearCookie("token", cookieOptions).send({ success: true });
}

export const JwtController = {
  tokenCreate,
  tokenRemove,
};
