import React from "react";

import { RegistrationErrorState } from "./state";

export interface IsPasswordNotValidProps {
  password: string;
  setErrors: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
}
