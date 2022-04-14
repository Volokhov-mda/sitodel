export enum LoadingState {
  LOADED = "LOADED",
  LOADING = "LOADING",
  ERROR = "ERROR",
  NEVER = "NEVER",
}

export interface UserLogginData {
  email: string;
  password: string;
}
export interface UserRegistrationData {
  email: string;
  password: string;
  password2: string;
}

export interface User {
  address?: string;
  email?: string;
  facebook?: string;
  first_name?: string;
  gender?: string;
  image_url?: string;
  inn?: string;
  instagram?: string;
  last_name?: string;
  occupation?: string;
  phone?: string;
  vk?: string;
  website?: string;
  verified?:boolean;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserState {
  data: User | undefined;
  loadingState: LoadingState;
  errorMessage: string | undefined;
  regErrorMessage: string | undefined;
  tokens: Tokens | undefined;
  regLoadingState: LoadingState;
  formState: {
    email: string;
    password: string;
  };
}
