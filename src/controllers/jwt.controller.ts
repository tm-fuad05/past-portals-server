import jwt from "jsonwebtoken";

export function tokenCreate(req, res) {
  const user = req.body;
  const secret = process.env.ACCESS_TOKEN_SECRET;
  const token = jwt.sign(user, secret, {
    expiresIn: "5h",
  });
  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
}

export function tokenRemove(_, res) {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .send({ success: true });
}
