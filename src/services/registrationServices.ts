import logger from "../misc/logger";
import Success from "../domain/Success";
import IRegistration, { IRegistrationToInsert } from "../domain/Register";
import RegistrationModel from "../models/registration";

export const getAllRegistrations = async (): Promise<
  Success<IRegistration[]>
> => {
  logger.info("Getting All Registrations");
  const registrations = await RegistrationModel.getAllRegistrations();
  return {
    data: registrations,
    message: "Registrations fetched successfully",
  };
};

export const createRegistration = async (
  registrationData: IRegistrationToInsert
): Promise<Success<IRegistration>> => {
  logger.info("Creating Registration for ", registrationData.email);
  const registration = await RegistrationModel.createRegistration({
    first_name: registrationData.firstName,
    last_name: registrationData.lastName,
    user_id: registrationData.user_id,
    ethnicity: registrationData.ethnicity,
    gender: registrationData.gender,
    email: registrationData.email,
    birthdate: registrationData.birthdate,
    address: registrationData.address,
    payment_info: registrationData.paymentInfo,
  });
  return {
    data: registration,
    message: "Registered successfully",
  };
};
