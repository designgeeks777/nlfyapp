import React, { useState, createContext, useRef, useEffect } from "react";
import {
  signOut,
  signInWithPhoneNumber,
  onAuthStateChanged,
  getAuth,
  RecaptchaVerifier,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import * as firebase from "firebase/compat";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASEURL } from "../../../APIKey";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const auth = useRef(getAuth()).current;
  const [authenticated, setAuthenticated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [confirmResult, setConfirm] = useState(null);
  const [isValidOTPCode, setisValidOTPCode] = useState(false);

  var testPhoneNumber1 = "+1 650-555-3434";
  var testPhoneNumber2 = "+1 650-555-3444";
  var testPhoneNumber3 = "+1 650-555-1234";
  var testPhoneNumber4 = "+1 650-555-1123";
  var testPhoneNumber5 = "+1 650-555-1232";
  var testVerificationCode1 = "456457";
  var testVerificationCode2 = "867542";
  var testVerificationCode3 = "654321";
  var testVerificationCode4 = "456453";
  var testVerificationCode5 = "123244";
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
      auth,
      async (usr) => {
        console.log("AUTH CONTEXT", usr);
        if (usr) {
          setUser(usr);
          await getUserId(usr.phoneNumber);
          console.log("onAuthStateChanged", usr.uid, userId);
          setAuthenticated(true);
          // if (usr.displayName === null || usr.displayName === undefined) {
          if (usr.uid === userId) {
            setRegistered(true);
          } else {
            setRegistered(false);
          }
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
          setAuthenticated(false);
          setRegistered(false);
        }
      }
    );

    return unsubscribeFromAuthStatuChanged;
  }, [auth]);

  const getUserId = (phoneNumber) => {
    axios
      .get(`${BASEURL}/usersByMobileNumber/${phoneNumber}`)
      .then((response) => {
        if (response.data) {
          console.log("USER EXISTS in db", response.data.uid);
          setUserId(response.data.uid);
          return userId;
        }
      })
      .catch((error) => {
        console.log(error, "USER not in db");
        setUserId("");
        return userId;
      });
  };

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
    phoneNumber = testPhoneNumber1;
    console.log("SIGN IN AUTH CONTEXT", phoneNumber);
    setIsLoading(true);
    try {
      // if (phoneNumber) {
      console.log("CALLED>>>>>>>>>>>>>>>>>>>>>>>>.");
      await firebase
        .auth()
        // .signInWithPhoneNumber(testPhoneNumber2, appVerifier)
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirm(confirmationResult);
          setIsLoading(false);
          console.log("SIGN IN RESULT", confirmResult);
        })
        .catch((e) => {
          setIsLoading(false);
          setError(e.message);
          console.log("SIGN IN ERROR", e);
        });
      // }
    } catch (err) {
      console.log("In try catch block sign in", err);
    }
  };
  const confirmCode = async (otpCode) => {
    otpCode = testVerificationCode1;
    console.log("CONFIRM OTP AUTH CONTEXT", otpCode);
    setIsLoading(true);
    try {
      // if (confirmResult && otpCode.length > 0) {
      await confirmResult
        // .confirm(testVerificationCode2)
        .confirm(otpCode)
        .then((result) => {
          setIsLoading(false);
          setisValidOTPCode(true);
          setUser(result.user);
          console.log(
            "User Info confirm code call",
            user,
            result.user.displayName,
            registered,
            isValidOTPCode
          );
        })
        .catch((e) => {
          setIsLoading(false);
          setisValidOTPCode(false);
          switch (e.code) {
            case "auth/invalid-verification-code":
              setError("Invalid verification code");
              break;
            default:
              console.log(e.message);
              break;
          }
          console.log("error in confirm code", e.message, isValidOTPCode);
        });
    } catch (err) {
      console.log("In try catch block confirm code", err);
    }
  };

  const updateProfile = async (name) => {
    await user
      .updateProfile({
        displayName: name,
      })
      .then((s) => {
        console.log(
          "user name in auth context update profile",
          user.displayName,
          registered
        );
      })
      .catch((err) => console.log("displayName???????", err.toString()));
  };

  const testSignin = () => {
    setConfirm("confirmResult");
    console.log("testSignin", confirmResult);
  };
  const testConfirmCode = () => {
    setisValidOTPCode(false);
    setUser("Ochi sacha");
    console.log("testConfirmCode", isValidOTPCode, user);
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
      setRegistered(false);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        registered,
        isValidOTPCode,
        confirmResult,
        setisValidOTPCode,
        setRegistered,
        setAuthenticated,
        setUser,
        onSignInWithPhoneNumber,
        confirmCode,
        updateProfile,
        onLogout,
        setError,
        testSignin,
        testConfirmCode,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
