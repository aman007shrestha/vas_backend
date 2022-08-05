import logger from "../misc/logger";
import Success from "../domain/Success";
import UserModel from "../models/UserAccount";
import User from "../domain/User";

export const getAllUsers = async (): Promise<Success<User[]>> => {
  logger.info("Getting All Users");
  const users = await UserModel.getAllUsers();
  return {
    data: users,
    message: "Users fetched successfully",
  };
};
