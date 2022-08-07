import jwt from "jsonwebtoken";

/**
 *
 * @param id userId on which the token is signed
 * @returns access token of expiry date 30d by default
 */
export const generateToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};
