export interface RegistrationErrorState {
  userNameError?: string;
  emailError: string;
  passwordError: string;
  repeatPasswordError?: string;
}

export interface RegistrationState {
  userName?: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
