import { signInWithPhoneNumber } from "firebase/auth";

export const onSignInWithPhoneNumber = (phoneNumber, recaptchaVerifier) =>
  signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
