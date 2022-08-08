interface User {
  id: number;
  email: string;
  password: string;
  is_admin?: boolean;
  is_registered?: boolean;
}

export type UserToInsert = Omit<User, "id">;

export default User;
