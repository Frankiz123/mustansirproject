import {NavigatorScreenParams} from '@react-navigation/native';

export type AuthStackParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type AppStackParamList = {
  // navigate(arg0: string): unknown;
  SplashScreen: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  SearchScreen: undefined;
  SearchResultsScreen: undefined;
  SearchRecommendScreen: undefined;
  ErrorScreen: undefined;
};
