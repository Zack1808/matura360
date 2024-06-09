import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import * as SecureStorage from "expo-secure-store";

import { auth } from "../../firebaseConfig";

// import { useRegistration } from "./registration";

export const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [checkingStatus, setCheckingStatus] = useState<boolean>(true);

  const isMounted = useRef(true);

  // const { loginUser } = useRegistration({});

  useEffect(() => {
    const getData = async () => {
      const email = await SecureStorage.getItemAsync("email");
      const password = await SecureStorage.getItemAsync("password");

      // if (!!email && !!password) loginUser(email, password);
    };

    if (isMounted) {
      getData();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          user.isAnonymous ? setIsAnonymous(true) : setIsLoggedIn(true);
        }
        setCheckingStatus(false);
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  return { isLoggedIn, isAnonymous, checkingStatus };
};
