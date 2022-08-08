import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import CustomError from "../misc/CustomError";
import UserModel from "../models/UserAccount";
import { DataStoredInToken } from "../domain/Token";
import { RequestWithUser } from "../domain/CustomRequest";

const checkAccess = async (
  req: RequestWithUser,
  res: Response,
  isAdminCheck: boolean,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DataStoredInToken;
      const id = decoded.id;
      const currentUser = await UserModel.getUserById(id);
      if (currentUser) {
        // Check admin only access if isAdminCheck bool === true
        req.user = currentUser;
        if (isAdminCheck) {
          if (!currentUser.is_admin) {
            next(
              new CustomError("Admin access only", StatusCodes.UNAUTHORIZED)
            );
          }
        }
      }
      if (!currentUser) {
        next(new CustomError("Not Authorized", StatusCodes.UNAUTHORIZED));
      }
      next();
    } catch (errror) {
      next(new CustomError("Not Authorized", StatusCodes.UNAUTHORIZED));
    }
  }
  if (!token) {
    next(new CustomError("Not Authorized", StatusCodes.UNAUTHORIZED));
  }
};

/**
 *
 * @desc General authentication routes check isAdmin bool = false
 */
export const protectRouteAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  checkAccess(req, res, false, next);
};

/**
 *
 * @desc Admin only routes check idAdmin bool = true
 * @param res
 * @param next
 */
export const AdminOnlyRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  checkAccess(req, res, true, next);
};
