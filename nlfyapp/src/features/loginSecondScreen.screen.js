import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
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
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");

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
  const [seconds, setSeconds] = useState(30);

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
  };
  const onClickContinue = () => {
    setResetErrors(false);

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
    margin-top: ${width * 0.1}px;
    margin-bottom: ${width * 0.1}px;
  `;

  const ResendCodeText = styled(Text)`
    text-align: center;
    font-size: ${(props) => props.theme.fontSizes.title};
    color: ${(props) => props.theme.colors.border.error};
    font-family: ${(props) => props.theme.fonts.body};
    text-decoration: underline;
  `;

  const CounterText = styled(Text)`
    font-size: ${(props) => props.theme.fontSizes.caption};
    font-family: ${(props) => props.theme.fonts.body};
    display: flex;
    align-self: center;
    padding-top: ${height * 0.05}px;
  `;

  const MessageText = styled(Text)`
    align-self: flex-start;
    top: ${width * 0.01}px;
    left: ${width * 0.02}px;
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
    padding-bottom: 20px;
  `;

  const OTPMessageText = styled(Text)`
    align-self: center;
    padding-top: ${width * 0.01}px;
    padding-bottom: ${width * 0.001}px;
    font-size: ${(props) => props.theme.fontSizes.caption};
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      padding: width * 0.06,
      alignItems: "center",
      backgroundColor: "#ffffff",
    },

    otpInputContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    otpInputBox: {
      // width: 40, // Adjust the width as needed
      // marginRight: 20, // Adjust the margin as needed
      width: width * 0.04,
      marginRight: width * 0.02,
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

  useEffect(() => {
    if (confirmResult && recaptchaVerifier.current) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000);
      console.log("SECONDS ?>>>>>>", seconds);

      return () => {
        clearInterval(interval);
      };
    }
  }, [confirmResult, seconds]);

  const resendCode = () => {
    console.log("call signinwithphone number again");
    onSignInWithPhoneNumber(phoneNumber, recaptchaVerifier.current);
    setResetErrors(true);
    setSeconds(30);
    setOtpCode("");
  };
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
            placeholder="+919999890802"
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
          <Button
            label="Continue"
            handleClick={onSignIn}
            disabled={!isValid || isLoading}
          />
        </>
      ) : (
        <>
          <Heading>Please verfiy, its you {username}</Heading>

          <OTPMessageText>
            Enter 6 digit verification code sent to the number
          </OTPMessageText>
          <View style={styles.otpInputContainer}>
            <OTPInput
              code={otpCode}
              setCode={setOtpCode}
              maximumLength={maximumOtpCodeLength}
              // setIsOtpCodeReady={setIsOtpCodeReady}
              isValidOTPCode={isValidOTPCode}
              resetError={resetError}
              inputStyle={styles.otpInputBox}
            />
          </View>

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
          <Button
            label="Continue"
            handleClick={() => onClickContinue()}
            //disabled={!isOtpCodeReady}
            disabled={!isValidOTPCode || isLoading || !isOtpCodeReady}
          />
          {seconds > 0 && !error ? (
            <CounterText>
              Time Remaining: 00:
              {seconds < 10 ? `0${seconds}` : seconds}
            </CounterText>
          ) : (
            <Text style={{ fontSize: 12, color: "#DE1621" }}>{error}</Text>
          )}
          {seconds === 0 && (
            <CounterText>
              Didn't recieve code?{" "}
              <TouchableOpacity onPress={() => resendCode()}>
                <ResendCodeText>Resend</ResendCodeText>
              </TouchableOpacity>
            </CounterText>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
