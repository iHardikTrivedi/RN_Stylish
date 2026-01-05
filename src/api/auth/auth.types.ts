export type LoginInput = {
  phone_no: string;
  password: string;
};

export type LoginBody = LoginInput & {
  country_code: string;
  type: string;
  auth_type: string;
  device: string;
};

export type LoginResponse = {
  status: boolean;
  message: {
    title: string;
    description: string;
  };
  data: {
    id: number;
    name: string | null;
    email: string | null;
    lang: string | null;
    token: string | null;
  };
};

export type RegisterBody = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  token: string;
};

export type ForgotPasswordBody = {
  email: string;
};

export type ForgotPasswordResponse = {
  message?: string;
};
