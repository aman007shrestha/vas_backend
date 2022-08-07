import { Request } from "express";
interface User {
  id: number;
  email: string;
  password: string;
  is_admin?: boolean;
  is_registered?: boolean;
}
export interface ISetUserRequest extends Request {
  u: User;
}
export type UserToInsert = Omit<User, "id">;

export default User;
