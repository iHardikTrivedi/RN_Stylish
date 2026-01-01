import { RootRoutes, AuthRoutes, AppRoutes } from "./routes";

export type RootStackParamList = {
  [RootRoutes.Splash]: undefined;
  [RootRoutes.Intro]: undefined;
  [RootRoutes.Auth]: undefined;
  [RootRoutes.App]: undefined;
};

export type AuthStackParamList = {
  [AuthRoutes.SignIn]: undefined;
  [AuthRoutes.SignUp]: undefined;
  [AuthRoutes.ForgotPassword]: undefined;
};

export type AppStackParamList = {
  [AppRoutes.Home]: undefined;
};