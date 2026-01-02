export type SignupRequest = {
  username: string;
  password: string;
};

export type SignupResponse = {
  token: string;
  user?: {
    id: string | number;
    username?: string;
    email?: string;
  };
};
