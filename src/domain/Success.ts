interface Success<T> {
  data?: T | T[];
  message: string;
}
export interface ILoginSuccess {
  accessToken: string;
  id: number;
  email: string;
  is_admin?: boolean;
  is_registered?: boolean;
}

export default Success;
