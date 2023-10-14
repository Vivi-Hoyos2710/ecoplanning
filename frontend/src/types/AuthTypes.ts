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
type SignInFormData = {
  name: string;
  email: string;
  password: string;
  brand: string;
  brand_id: number;
  model: string;
  regisPlate: string;
};
type CarFormInfo={
  user: number;
  brand: number;
  brand__name: string;
  license_plate: string;
  model: number;
  model__name:string
}
export type { LoginRequest, LoginToken, LoginFormData, SignInFormData, CarFormInfo };
