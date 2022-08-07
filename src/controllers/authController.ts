import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser, loginService } from "../services/authServices";

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  loginService({ email, password })
    .then((data) => res.json(data))
    .catch((err) => {
      err.statusCode = StatusCodes.UNAUTHORIZED;
      next(err);
    });
};

export const register = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  createUser({ email, password })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => next(err));
};
