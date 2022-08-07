import db from "../db/db";
import User, { UserToInsert } from "../domain/User";

class UserAccount {
  public static table = "user_account";
  public static async getAllUsers() {
    const users = await db(UserAccount.table).select(
      "id",
      "email",
      "is_admin",
      "is_registered"
    );
    return users;
  }

  /**
   *
   * @desc creates user object and inserts into database
   * @param user : user object which is to be insert
   * @returns newly created user object without passsword
   */
  public static async createUser(user: UserToInsert) {
    console.log(user);
    const newUser = await db(UserAccount.table).insert(user, [
      "id",
      "email",
      "is_admin",
      "is_registered",
    ]);
    return newUser;
  }

  public static async getUserByEmail(email: string): Promise<User> {
    const user = await db(UserAccount.table)
      .where({ email: email })
      .select()
      .first();
    return user;
  }

  public static async getUserById(id: number): Promise<User> {
    const user = await db(UserAccount.table)
      .where({ id })
      .select("id", "email", "is_admin", "is_registered")
      .first();
    return user;
  }
}

export default UserAccount;
