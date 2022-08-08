interface IRegistration {
  patient_id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  ethnicity: string;
  gender: "male" | "female" | "other";
  email: string;
  address: {
    cityName: string;
    stateName: string;
    streetName: string;
  };
  paymentInfo: {
    insuranceProvider: string;
    insuranceId: number;
    memberId: number;
  };
  user_id: number | undefined;
}
export interface IRegistrationInDatabase {
  first_name: string;
  last_name: string;
  birthdate: Date;
  ethnicity: string;
  gender: "male" | "female" | "other";
  email: string;
  address: {
    cityName: string;
    stateName: string;
    streetName: string;
  };
  payment_info: {
    insuranceProvider: string;
    insuranceId: number;
    memberId: number;
  };
  user_id: number | undefined;
}

export type IRegistrationToInsert = Omit<IRegistration, "patient_id">;

export default IRegistration;
