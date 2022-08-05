interface User {
  id: number;
  name: string;
  email: string;
}

export type UserToInsert = Omit<URLSearchParams, "id">;

export default User;
