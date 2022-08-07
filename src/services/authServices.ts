// import logger from "../misc/logger";
import Success, { ILoginSuccess } from "../domain/Success";
import User, { UserToInsert } from "../domain/User";
import bcrypt from "bcrypt";
import UserModel from "../models/UserAccount";
import { generateToken } from "../utils/utils";

/**
 *
 * @param user user object from controller
 * @returns Error or Success of registered user
 */
export const createUser = async (
  user: UserToInsert
): Promise<Success<User>> => {
  const { password } = user;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const createdUser = await UserModel.createUser({
    ...user,
    password: hashedPassword,
  });
  return {
    data: createdUser,
    message: "User created succesfully",
  };
};

/**
 *
 * @param user: user object which is to be authenticated
 * @returns Error or Success
 */
export const loginService = async (
  user: UserToInsert
): Promise<Success<ILoginSuccess>> => {
  const { email, password } = user;
  const existingUser = await UserModel.getUserByEmail(email);
  // Search user by email, if false invalid credential
  if (!existingUser) {
    throw new Error("Invalid credential");
  }
  // compare hash of password with bcrypt
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credential");
  }
  // Sign Token
  const accessToken = generateToken(existingUser.id);
  return {
    data: {
      accessToken,
      id: existingUser["id"],
      email: existingUser.email,
      is_admin: existingUser.is_admin,
      is_registered: existingUser.is_registered,
    },
    message: "User logged In successfully",
  };
};
