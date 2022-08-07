import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import CustomError from "../misc/CustomError";
import * as registrationService from "../services/registrationServices";
import { RequestWithUser } from "../domain/CustomRequest";
import { IRegistrationToInsert } from "../domain/Register";

export const getAllRegistrations = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  registrationService
    .getAllRegistrations()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 *
 * @param req
 * @param res
 * @param next
 */
export const createRegistration = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    birthdate,
    ethnicity,
    gender,
    email,
    address,
    paymentInfo,
  }: IRegistrationToInsert = req.body;

  // check permission i.e a user hitting this url is indeed allowed to change req.user.id === (user.email obtained from getUserByEmail) or req.user.is_admin
  if (
    !firstName ||
    !lastName ||
    !birthdate ||
    !ethnicity ||
    !gender ||
    !email ||
    !address ||
    !paymentInfo
  ) {
    throw new CustomError("Input all fields", StatusCodes.BAD_REQUEST);
  }
  let user_id: number | undefined;
  if (req.user) {
    user_id = req.user.id;
  }
  registrationService
    .createRegistration({
      firstName,
      lastName,
      address,
      birthdate: new Date(birthdate),
      email,
      ethnicity,
      gender,
      paymentInfo,
      user_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
