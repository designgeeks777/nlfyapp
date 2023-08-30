import React, { useState, createContext, useEffect, useCallback } from "react";
import { signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import * as firebase from "firebase/compat";
import axios from "axios";
import { BASEURL } from "../../../APIKey";
import { auth } from "../../../firebase";

import { useNavigation } from "@react-navigation/native";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  // const auth = useRef(getAuth()).current;
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [errorOTP, setErrorOTP] = useState(null);
  const [confirmResult, setConfirm] = useState(null);
  const [isValidOTPCode, setIsValidOTPCode] = useState(null);
  const [userId, setUserId] = useState("");

  const [dataInLocalAPICompleted, setDataInLocalAPICompleted] = useState(false);
  //const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(
      auth,
      async (usr) => {
        console.log("AUTH CONTEXT", usr);
        if (usr) {
          await getUserId(usr.phoneNumber);
          console.log("onAuthStateChanged", usr.uid, userId);
          if (usr.uid === userId) {
            // moved set user inside for bug - navigating to home page with unregistered phone number,
            // as the phoneNumber is getting registered with firebase
            setUser(usr);
            setRegistered(true);
          } else {
            // set user null for bug - navigating to home page with unregistered phone number,
            // as the phoneNumber is getting registered with firebase
            setUser(null);
            setRegistered(false);
          }
          setIsLoading(false);
          // }
        } else {
          setUser(null);
          setIsLoading(false);
          setRegistered(false);
        }
      }
    );

    return unsubscribeFromAuthStatuChanged;
  }, [getUserId, userId]);

  const getUserId = useCallback(
    (phoneNumber) => {
      axios
        .get(`${BASEURL}/users/${phoneNumber}`)
        .then((response) => {
          if (response.data) {
            console.log("USER EXISTS in db", response.data.uid);
            setUserId(response.data.uid);
            return userId;
          }
        })
        .catch((err) => {
          console.log(err, "USER not in db");
          setUserId("");
          return userId;
        });
    },
    [userId]
  );
  const testPhoneNumber = "+1 650-555-4567";
  const testOtpCode = "777771"; // correct otp
  //const testOtpCode = "328477"; // Incorrect otp

  const resetConfirmResult = () => {
    console.log("Reset confirm Result called");
    setConfirm(null);
  };
  const onSignInWithPhoneNumber = async (phoneNumber, appVerifier) => {
    // phoneNumber = testPhoneNumber;
    console.log("SIGN IN AUTH CONTEXT", phoneNumber);
    setIsLoading(true);
    //This is set to avoid pre-stored value
    setIsValidOTPCode(false);
    try {
      console.log("CALLED>>>>>>>>>>>>>>>>>>>>>>>>.");
      await firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          setConfirm(confirmationResult);
          setIsLoading(false);
          setError("");
          console.log("SIGN IN RESULT", confirmResult);
        })
        .catch((e) => {
          setIsLoading(false);
          // set user null for bug - navigating to home page with unregistered phone number,
          // as the phoneNumber is getting registered with firebase
          setConfirm(null);
          setUser(null);
          // setError(e.message);
          switch (e.code) {
            case "auth/too-many-requests":
              setError(
                "We have blocked all requests from this device due to unusual activity. Try again later."
              );
              break;
            default:
              setError(e.message);
              break;
          }
          console.log("SIGN IN ERROR", e);
        });
    } catch (err) {
      setIsLoading(false);
      console.log("In try catch block sign in auth context", err);
    }
  };
  const confirmCode = async (otpCode) => {
    // otpCode = testOtpCode;
    console.log("CONFIRM OTP AUTH CONTEXT", otpCode);
    setIsLoadingOTP(true);
    try {
      await confirmResult
        .confirm(otpCode)
        .then((result) => {
          setIsLoadingOTP(false);
          setIsValidOTPCode(true);
          setUser(result.user);
          console.log(
            "User Info confirm code call",
            user,
            result.user.displayName,
            registered,
            isValidOTPCode
          );
          setErrorOTP("");
        })
        .catch((e) => {
          setIsLoadingOTP(false);
          setIsValidOTPCode(false);
          // set user null for bug - navigating to home page with unregistered phone number,
          // as the phoneNumber is getting registered with firebase
          setUser(null);
          switch (e.code) {
            case "auth/invalid-verification-code":
              setErrorOTP("Invalid verification code");
              break;
            case "auth/code-expired":
              setErrorOTP(
                "The SMS code has expired. Please re-send the verification code to try again."
              );
              break;
            default:
              setErrorOTP(e.message);
              break;
          }
          console.log("error in confirm code", e.message, isValidOTPCode);
        });
    } catch (err) {
      setIsValidOTPCode(false);
      setIsLoadingOTP(false);
      console.log("In try catch block confirm code", err);
    }
  };

  const updateProfileName = async (name) => {
    await updateProfile(user, {
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

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      // setRegistered(false);
      setError(null);
      setIsLoading(false);
    });
  };

  //This is added to be triggered from uploadPicSignUp to address the issue of name and pic npt loading in second signup
  //Adding this function will trigger a change in the value and hence call the useEffect in the welcome.component.js
  const isDataPostInLocalAPICompleted = (value) => {
    console.log("isDataPostInLocal called");
    console.log("Value before setter", dataInLocalAPICompleted);
    setDataInLocalAPICompleted(value);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        isLoadingOTP,
        error,
        errorOTP,
        registered,
        isValidOTPCode,
        confirmResult,
        dataInLocalAPICompleted,
        isDataPostInLocalAPICompleted,
        resetConfirmResult,
        setIsValidOTPCode,
        setRegistered,
        setUser,
        onSignInWithPhoneNumber,
        confirmCode,
        updateProfileName,
        onLogout,
        setError,
        setIsLoading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
