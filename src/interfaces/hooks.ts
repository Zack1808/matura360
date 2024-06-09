import React from "react";

import { RegistrationErrorState } from "./state";

export interface UseRegistrationProps {
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setErrors?: React.Dispatch<React.SetStateAction<RegistrationErrorState>>;
}
