// import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
// import logger from "../misc/logger";
// import CustomError from "../misc/CustomError";
import * as userService from "../services/userService";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
