import React, { useState, createContext, useRef } from "react";
import {
  signOut,
  signInWithPhoneNumber,
  onAuthStateChanged,
  getAuth,
  RecaptchaVerifier,
} from "firebase/auth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const auth = useRef(getAuth()).current;
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPReady, setisOTPReady] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [confirmResult, setConfirm] = useState(null);
  const [validOtpCode, setValidOtpCode] = useState("");

  onAuthStateChanged(auth, (usr) => {
    if (usr) {
      setUser(usr);
      const uid = usr.uid;
      console.log("AUTH CONTEXT", uid);
      console.log("AUTH CONTEXT", usr);
      setAuthenticated(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setAuthenticated(false);
    }
  });

  // const checkIfUserAlreadyExists = () => {
  //   admin
  //     .auth()
  //     .getUserByPhoneNumber(phoneNumber)
  //     .then(function (userRecord) {
  //       // User exists.
  //     })
  //     .catch(function (error) {
  //       if (error.code === "auth/user-not-found") {
  //         // User not found.
  //       }
  //     });
  // };
  const onSignInWithPhoneNumber = async (phoneNumber, appVerifier) => {
    console.log("SIGN IN AUTH CONTEXT", phoneNumber, appVerifier);
    setIsLoading(true);
    try {
      console.log("CALLED>>>>>>>>>>>>>>>>>>>>>>>>.");
      if (phoneNumber) {
        await signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            setConfirm(confirmationResult);
            setisOTPReady(true);
            setIsLoading(false);
            console.log("SIGN IN RESULT", confirmResult);
          })
          .catch((e) => {
            setIsLoading(false);
            setisOTPReady(false);
            setError(e.toString());
            console.log("SIGN IN ERROR", e);
          });
      }
    } catch (err) {
      console.log("In try catch block sign in", err);
    }
  };

  const confirmCode = (otpCode) => {
    console.log("CONFIRM OTP AUTH CONTEXT");
    if (isOTPReady) {
      setIsLoading(true);
      confirmResult
        .confirm(otpCode)
        .then((result) => {
          setIsLoading(false);
          const usr = result.user;
          setUser(usr);
          setValidOtpCode(true);
          console.log("User Info", user);
        })
        .catch((e) => {
          setValidOtpCode(false);
          setIsLoading(false);
          setError(e.toString());
        });
    }
  };

  // Turn off phone auth app verification.
  // firebase.auth().settings.appVerificationDisabledForTesting = true;

  // var phoneNumber = "+1 650-555-3434";
  // var testVerificationCode = "890098";

  // var appVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");
  // firebase
  //   .auth()
  //   .signInWithPhoneNumber(phoneNumber, appVerifier)
  //   .then(function (confirmationResult) {
  //     return confirmationResult.confirm(testVerificationCode);
  //   })
  //   .catch(function (error) {
  //     // Error; SMS not sent
  //   });

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        // isAuthenticated: !user,
        user,
        isLoading,
        isOTPReady,
        error,
        confirmResult,
        validOtpCode,
        setisOTPReady,
        onSignInWithPhoneNumber,
        confirmCode,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
