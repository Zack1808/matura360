import { useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";

import { UseRegistrationProps } from "../interfaces/hooks";

import { auth, db } from "../../firebaseConfig";

import {
  isUserNameInUse,
  isEmailFormatNotValid,
  isPasswordNotValid,
} from "../helpers/registration";

export const useRegistration = ({
  setIsLoading,
  setErrors,
}: UseRegistrationProps) => {
  const registerUser = useCallback(
    async (userName: string, email: string, password: string) => {
      setIsLoading && setIsLoading(true);
      try {
        if (!!!userName) return;

        const userNameUsed = await isUserNameInUse(userName);
        if (userNameUsed) {
          setErrors &&
            setErrors((prevState) => ({
              ...prevState,
              userNameError: "Korisničko ime je već u uporabi.",
            }));
          return;
        }

        if (isEmailFormatNotValid(email)) {
          setErrors &&
            setErrors((prevState) => ({
              ...prevState,
              emailError: "Mail adresa je neispravno unesena.",
            }));
          return;
        }

        if (setErrors && isPasswordNotValid({ password, setErrors })) return;

        const storedEmail = await SecureStore.getItemAsync("email");
        const storedPassword = await SecureStore.getItemAsync("password");

        if (!!!storedEmail && !!!storedPassword) {
          await SecureStore.setItemAsync("email", email);
          await SecureStore.setItemAsync("password", password);
        }

        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(user, { displayName: userName });

        await setDoc(doc(db, "users", user.uid), {
          displayName: userName,
          slug: userName.toLowerCase().replace(/\s/g, ""),
        });

        console.log("done");
      } catch (err: any) {
        switch (err.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            setErrors &&
              setErrors((prevState) => ({
                ...prevState,
                emailError: "Mail adresa se već koristi",
              }));
            break;
          default:
            break;
        }
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    [setIsLoading, setErrors]
  );

  return { registerUser };
};
