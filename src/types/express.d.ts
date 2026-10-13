import { JwtPayload } from "jsonwebtoken";

interface Payload extends JwtPayload {
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: Payload | JwtPayload;
    }
  }
}
