import React from "react";
import { Text } from "react-native";
import RegistrationStack from "./stacks/RegistrationStack";

import { useAuthStatus } from "./hooks/useAuthStatus";

const Router = () => {
  const { isAnonymous, isLoggedIn } = useAuthStatus();

  if (isAnonymous) return <Text>Anonymous</Text>;

  if (isLoggedIn) return <Text>Loggedin</Text>;

  return <RegistrationStack />;
};

export default Router;
