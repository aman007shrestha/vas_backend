// import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
// import logger from "../misc/logger";
// import CustomError from "../misc/CustomError";
import * as userService from "../services/userService";
// import { RequestWithUser } from "../domain/CustomRequest";

export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.user);
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
