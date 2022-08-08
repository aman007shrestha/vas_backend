import { StatusCodes } from "http-status-codes";
import db from "../db/db";
import { IRegistrationInDatabase } from "../domain/Register";
import CustomError from "../misc/CustomError";
import UserAccount from "./UserAccount";

class RegistrationTable {
  public static table = "registration_table";
  public static async getAllRegistrations() {
    const registrations = await db(RegistrationTable.table).select(
      "patient_id",
      "first_name",
      "last_name",
      "email"
    );
    return registrations;
  }
  /**
   * @desc create registration only if is_registered === false, or User exist with that email, after registration set is_registered true for that email
   * @param registrationData
   * @returns
   */
  public static async createRegistration(
    registrationData: IRegistrationInDatabase
  ) {
    const user = await UserAccount.getUserByEmail(registrationData.email);
    // if no user with the given email do not register
    if (!user) {
      throw new CustomError(
        "User does not exist with that email",
        StatusCodes.BAD_REQUEST
      );
    }
    // if user is registered don't allow registration
    if (user.is_registered) {
      throw new CustomError("User already registered", StatusCodes.BAD_REQUEST);
    }

    const newRegistration = await db(RegistrationTable.table).insert(
      registrationData,
      ["patient_id", "first_name"]
    );
    // set registered to true based on email
    UserAccount.setRegistration(registrationData.email);
    return newRegistration;
  }
  // Update registration
  // Get registration for loggedUser using req.user.id === user_id query
  // Delete registration unset is_registered
}

export default RegistrationTable;
