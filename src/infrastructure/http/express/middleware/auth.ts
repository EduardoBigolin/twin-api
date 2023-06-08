import { NextFunction, Request, Response } from "express";
import { Jwt } from "../../../utils/jwt";

interface AuthPayload {
  id: string;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

export class AuthMiddleware {
  public static authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ response: "Unauthorized" });
      return;
    }

    try {
      const decodedToken = Jwt.verifyToken(token) as AuthPayload;
      req.user = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
      };
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  }
}
