import { getDocs, where, query, collection } from "firebase/firestore";

import { db } from "../../firebaseConfig";

import { IsPasswordNotValidProps } from "../interfaces/helpers";

export const isUserNameInUse = async (userName: string) => {
  const usersCollection = collection(db, "users");
  const usersQuery = query(
    usersCollection,
    where("slug", "==", userName.toLocaleLowerCase().replace(/\s/g, ""))
  );
  try {
    const querySnapshot = await getDocs(usersQuery);

    return !querySnapshot.empty;
  } catch (err) {
    console.log(err);
  }
};

export const isEmailFormatNotValid = (email: string) => {
  const characters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !characters.test(email);
};

export const isPasswordNotValid = ({
  password,
  setErrors,
}: IsPasswordNotValidProps) => {
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const numbers = /[1-9]/;
  const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < 8) {
    setErrors((prevState) => ({
      ...prevState,
      passwordError: "Lozinka mora imat barem 8 znakova.",
    }));
    return true;
  }

  if (!upperCase.test(password)) {
    setErrors((prevState) => ({
      ...prevState,
      passwordError: "Lozinka mora imat barem 1 veliko slovo.",
    }));
    return true;
  }

  if (!lowerCase.test(password)) {
    setErrors((prevState) => ({
      ...prevState,
      passwordError: "Lozinka mora imat barem 1 malo slovo.",
    }));
    return true;
  }

  if (!numbers.test(password)) {
    setErrors((prevState) => ({
      ...prevState,
      passwordError: "Lozinka mora imat barem 1 broj.",
    }));
    return true;
  }

  if (!specialCharacters.test(password)) {
    setErrors((prevState) => ({
      ...prevState,
      passwordError: "Lozinka mora imat barem 1 poseban znak.",
    }));
    return true;
  }

  return false;
};
