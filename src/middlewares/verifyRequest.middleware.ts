import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

interface RequestValidationSchema {
  body?: ZodType;
  query?: ZodType;
}

export const verifyRequest = (schema: RequestValidationSchema | ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if ("parseAsync" in schema) {
        req.body = await schema.parseAsync(req.body);
        return next();
      }

      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }

      if (schema.query) {
        req.query = (await schema.query.parseAsync(req.query)) as any;
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues.map((err) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
      }

      next(error);
    }
  };
};
