import React, { useState, createContext, useEffect, useCallback } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import * as firebase from "firebase/compat";
import axios from "axios";
import { BASEURL } from "../../../APIKey";
import { auth } from "../../../firebase";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  // const auth = useRef(getAuth()).current;
  const [registered, setRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [confirmResult, setConfirm] = useState(null);
  const [isValidOTPCode, setIsValidOTPCode] = useState(null);
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
          if (usr.uid === userId) {
            setRegistered(true);
          } else {
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

  const onSignInWithPhoneNumber = async (phoneNumber, appVerifier) => {
    console.log("SIGN IN AUTH CONTEXT", phoneNumber);
    setIsLoading(true);
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
      console.log("In try catch block sign in auth context", err);
    }
  };
  const confirmCode = async (otpCode) => {
    console.log("CONFIRM OTP AUTH CONTEXT", otpCode);
    setIsLoading(true);
    try {
      await confirmResult
        .confirm(otpCode)
        .then((result) => {
          setIsLoading(false);
          setIsValidOTPCode(true);
          setUser(result.user);
          console.log(
            "User Info confirm code call",
            user,
            result.user.displayName,
            registered,
            isValidOTPCode
          );
          setError("");
        })
        .catch((e) => {
          setIsLoading(false);
          setIsValidOTPCode(false);
          switch (e.code) {
            case "auth/invalid-verification-code":
              setError("Invalid verification code");
              break;
            case "(auth/code-expired)":
              setError(
                "The SMS code has expired. Please re-send the verification code to try again."
              );
              break;
            default:
              setError(e.message);
              break;
          }
          console.log("error in confirm code", e.message, isValidOTPCode);
        });
    } catch (err) {
      setIsValidOTPCode(false);
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

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setRegistered(false);
      setError(null);
      setIsLoading(false);
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
        setIsValidOTPCode,
        setRegistered,
        setUser,
        onSignInWithPhoneNumber,
        confirmCode,
        updateProfile,
        onLogout,
        setError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
