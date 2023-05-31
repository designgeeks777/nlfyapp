import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
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

const { width } = Dimensions.get("window");

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
  } = useContext(AuthenticationContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [resetError, setResetErrors] = useState(false);
  const navigation = useNavigation();
  const [username, setUsername] = useState(null);

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
    let dataexists = false;
    try {
      const response = await axios.get(`${BASEURL}/users/`);

      if (response.data) {
        const data = response.data;

        data.forEach((item) => {
          if (item.mobileNumber === phoneNumber) {
            console.log("USER EXISTS");
            dataexists = true;
            setUserRegistered(true);
            setUsername(item.name);
          }
        });
      } else {
        console.log("USER DOESN'T EXISTS");
        setUserRegistered(false);
        dataexists = false;
      }
    } catch (err) {
      console.log(err, "User Not Registered signin");
      dataexists = false;
    }
    return dataexists;
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
  const onClickConfirmCode = () => {
    setResetErrors(false);
    confirmCode(code);
    const HomeStackModalNavigator = navigation.getId();
    if (HomeStackModalNavigator === "HomeStackModal") {
      navigation.navigate("HomeStack");
    } else {
      navigation.navigate("Home");
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

  const OTPMessageText = styled(Text)`
    align-self: center;
    padding-top:${width * 0.01}px; 
    padding-bottom: ${width * 0.001}px; 
    font-size: ${(props) => props.theme.fontSizes.caption};
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const LoginButtonView = styled(View)`
    flex: 1;
    justify-content: flex-end;
    margin-bottom:${width * 0.2}px; 
  `;
  const styles = StyleSheet.create({
    containerView: {
      flex: 1,
      padding: width * 0.01, 
      alignItems: "center",
      backgroundColor: "#ffffff",
    },
  });

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
            placeholder="(+91)9999999999"
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
          <LoginButtonView>
            <Button
              label="Continue"
              handleClick={onSignIn}
              disabled={!isValid}
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
            code={code}
            setCode={(e) => setCode(e)}
            maximumLength={maximumCodeLength}
            // setIsPinReady={setIsPinReady}
            isValidOTPCode={isValidOTPCode}
            resetError={resetError}
          />
          <MessageText>
            {isPinReady && !isValidOTPCode && !resetError ? error : ""}
          </MessageText>
          <LoginButtonView>
            <Button
              label="Confirm Code"
              handleClick={() => onClickConfirmCode()}
              disabled={!isPinReady}
            />
          </LoginButtonView>
        </>
      )}
    </SafeAreaView>
  );
};
