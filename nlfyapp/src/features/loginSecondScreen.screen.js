import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase/compat";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { CustomTextInput } from "../components/textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import { OTPInput } from "../components/otpInput";
import styled from "styled-components";
import { Button } from "../components/button";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { BASEURL } from "../../APIKey";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export const LoginSecondScreen = ({ route }) => {
  const recaptchaVerifier = React.useRef(null);
  const attemptInvisibleVerification = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [code, setCode] = useState("");
  const maximumCodeLength = 6;
  const [isPinReady, setIsPinReady] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const {
    user,
    error,
    isValidOTPCode,
    onSignInWithPhoneNumber,
    confirmCode,
    confirmResult,
    resetConfirmResult,
    isLoadingOTP,
    isLoading,
    errorOTP,
  } = useContext(AuthenticationContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [resetError, setResetErrors] = useState(false);
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const maximumOtpCodeLength = 6;
  const [isOtpCodeReady, setIsOtpCodeReady] = useState(false);

  const handleChange = (value) => {
    setPhoneNumber(value);
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (phoneNumber.match(regexp)) {
      setIsValid(true);
      setErrorMsg("");
      console.log("in verify step match", phoneNumber);
    } else {
      setIsValid(false);
      setErrorMsg("Enter a valid phone number");
      console.log("mismatch");
    }
  };

  const checkIfUserAlreadyRegistered = async () => {
    try {
      const response = await axios.get(`${BASEURL}/users/`);

      if (response.data) {
        const data = response.data;

        for (const item of data) {
          if (item.mobileNumber === phoneNumber) {
            console.log("User Exists");
            setUserRegistered(true);
            setUsername(item.name);
            console.log("Data Exists For Each", true);
            return true;
          }
        }

        console.log("USER DOESN'T EXIST");
        setUserRegistered(false);
        console.log("User Doesn't exist", false);
        return false;
      } else {
        console.log("USER DOESN'T EXIST");
        setUserRegistered(false);
        console.log("User Doesn't exist", false);
        return false;
      }
    } catch (err) {
      console.log(err, "User Not Registered signin");
      console.log("User Doesn't exist", false);
      return false;
    }
  };

  useEffect(() => {
    console.log("userRegistered changed", userRegistered);
    if (!userRegistered) {
      setIsValid(false);
      setLoginError(true);
    }
  }, [userRegistered]);

  const onSignIn = async () => {
    const isregistered = await checkIfUserAlreadyRegistered();
    if (isregistered) {
      console.log("isRegistered login");
      setIsValid(true);
      setErrorMsg("");
      onSignInWithPhoneNumber(phoneNumber, recaptchaVerifier.current);
    } else {
      setIsValid(false);
      console.log("is not Registered login");
      setErrorMsg("Enter your registered mobile number");
    }
    //resetConfirmResult();
  };
  const onClickContinue = () => {
    setResetErrors(false);

    //console.log("On CLick Confirm code otpCode", otpCode);
    //confirmCode(otpCode);
    const HomeStackModalNavigator = navigation.getId();

    console.log("Home Stack Modal Navigator", HomeStackModalNavigator);
    if (isValidOTPCode) {
      resetConfirmResult();
      if (HomeStackModalNavigator === "HomeStackModal") {
        navigation.navigate("HomeStack");
      } else {
        navigation.navigate("Home");
      }
    }
    console.log("HomeStack confirm code", HomeStackModalNavigator);
  };

  useEffect(() => {
    console.log("isOtpCodeReady", code.length);
    setIsPinReady(code.length === maximumCodeLength);
    if (code.length <= 5) {
      setResetErrors(true);
    }
  }, [code]);

  const Heading = styled(Text)`
    color: ${(props) => props.theme.colors.text.secondary};
    font-family: ${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.button};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    letter-spacing: ${(props) => props.theme.space[1]};
    text-align: center;
    margin-top: 28px;
    margin-bottom: 28px;
  `;

  const MessageText = styled(Text)`
    align-self: flex-start;
    top: 10px;
    left: 20px;
    font-size: ${(props) => props.theme.fontSizes.title};
    color: ${(props) =>
      props.isValid
        ? props.theme.colors.text.infoMessage
        : props.theme.colors.text.errorMessage};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const LoadingText = styled(Text)`
    padding-left: 20px;
    align-self: flex-start;
    font-size: ${(props) => props.theme.fontSizes.title};
    color: ${(props) => props.theme.colors.border.success};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const ActivityIndicatorView = styled(View)`
    flex-direction: row;
  `;

  const OTPMessageText = styled(Text)`
    align-self: center;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: ${(props) => props.theme.fontSizes.caption};
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const WrapperView = styled(SafeAreaView)`
    flex: 1;
    padding: 10px;
    align-items: center;
    background-color: ${(props) => props.theme.colors.bg.primary};
  `;

  const LoginButtonView = styled(View)`
    flex: 1;
    justify-content: flex-end;
    margin-bottom: 80px;
  `;
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      padding: 10,
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
  });

  //Reset confirmResult on load of login screen if there is any previous step.
  //This is added as part of a fix where on click of back Button in login screen and clicking on ligin again was taking to the OTP Screen
  useEffect(() => {
    resetConfirmResult();
  }, []);

  useEffect(() => {
    console.log("isOtpCodeReady", otpCode.length);
    setIsOtpCodeReady(otpCode.length === maximumOtpCodeLength);

    if (otpCode.length <= 5) {
      setResetErrors(true);
    }
  }, [otpCode]);

  useEffect(() => {
    if (otpCode.length === maximumOtpCodeLength) {
      console.log("Calling Confirm Code");
      setResetErrors(false);
      confirmCode(otpCode);
    }
  }, [otpCode]);

  return (
    <SafeAreaView style={styles.containerView}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app.options}
        attemptInvisibleVerification={false}
      />
      {!confirmResult ? (
        <>
          <Heading>We are glad to have you back.</Heading>
          <CustomTextInput
            label="Mobile Number"
            maxLength={15}
            placeholder="+91999989080"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            msgToDisplay={error || errorMsg}
            value={phoneNumber}
            onChange={handleChange}
            isValid={isValid}
            isUserNameTextInput={false}
          />
          {isLoading ? (
            <ActivityIndicatorView>
              <LoadingText>Checking number</LoadingText>
              <ActivityIndicator color="#27AE60" />
            </ActivityIndicatorView>
          ) : (
            <></>
          )}
          <LoginButtonView>
            <Button
              label="Continue"
              handleClick={onSignIn}
              disabled={!isValid || isLoading}
            />
          </LoginButtonView>
        </>
      ) : (
        <>
          <Heading>Please verfiy, its you {username}</Heading>
          {/* <Heading>Please verfiy, its you David</Heading> */}
          <OTPMessageText>
            Enter 6 digit verification code sent to the number
          </OTPMessageText>
          <OTPInput
            code={otpCode}
            setCode={setOtpCode}
            maximumLength={maximumOtpCodeLength}
            // setIsOtpCodeReady={setIsOtpCodeReady}
            isValidOTPCode={isValidOTPCode}
            resetError={resetError}
          />
          {isLoadingOTP ? (
            <ActivityIndicatorView>
              <LoadingText>Validating OTP</LoadingText>
              <ActivityIndicator color="#27AE60" />
            </ActivityIndicatorView>
          ) : (
            <MessageText>
              {isOtpCodeReady && !isValidOTPCode && !resetError ? errorOTP : ""}
            </MessageText>
          )}

          <LoginButtonView>
            <Button
              label="Continue"
              handleClick={() => onClickContinue()}
              //disabled={!isOtpCodeReady}
              disabled={!isValidOTPCode || isLoading || !isOtpCodeReady}
            />
          </LoginButtonView>
        </>
      )}
    </SafeAreaView>
  );
};
