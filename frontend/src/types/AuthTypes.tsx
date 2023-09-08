type LoginRequest = {
  email: string;
  password: string;
};

type LoginToken = {
  auth_token: string;
};

type LoginFormData = {
  email: string;
  password: string;
};

export type { LoginRequest, LoginToken, LoginFormData };
