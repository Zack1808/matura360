import { useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";

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

        const currUser = auth.currentUser;

        if (currUser && currUser.isAnonymous) {
          await deleteUser(currUser);
        }

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
            Toast.show({
              type: "error",
              text1: "Nešto je pošlo po zlu!",
            });
            const timer = setTimeout(() => Toast.hide(), 300);
            break;
        }
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    [setIsLoading, setErrors]
  );

  const loginUser = useCallback(
    async (email: string, password: string) => {
      setIsLoading && setIsLoading(true);
      try {
        if (isEmailFormatNotValid(email)) {
          setErrors &&
            setErrors((prevState) => ({
              ...prevState,
              emailError: "Mail adresa je neispravno unesena.",
            }));
          return;
        }

        const currUser = auth.currentUser;

        if (currUser && currUser.isAnonymous) {
          await deleteUser(currUser);
        }

        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log(user);

        const storedEmail = await SecureStore.getItemAsync("email");
        const storedPassword = await SecureStore.getItemAsync("password");

        if (!!!storedEmail && !!!storedPassword) {
          await SecureStore.setItemAsync("email", email);
          await SecureStore.setItemAsync("password", password);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading && setIsLoading(false);
      }
    },
    [setIsLoading, setErrors]
  );

  const setToGuestMode = useCallback(async () => {
    setIsLoading && setIsLoading(true);
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading && setIsLoading(false);
    }
  }, [setIsLoading]);

  return { registerUser, loginUser, setToGuestMode };
};
