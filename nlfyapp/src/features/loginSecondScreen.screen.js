import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as firebase from "firebase/compat";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { CustomTextInput } from "../components/textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import { OTPInput } from "../components/otpInput";
import styled from "styled-components";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { BASEURL } from "../../APIKey";
import axios from "axios";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;

export const LoginSecondScreen = (props) => {
  const recaptchaVerifier = React.useRef(null);
  const attemptInvisibleVerification = useState(true);
  const [user, setUser] = useState(null);
  const [isValid, setisValid] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const maximumCodeLength = 6;
  const [validOtpCode, setValidOtpCode] = useState(false);
  const [isPinReady, setIsPinReady] = useState(false);

  const [phoneNumber, setphoneNumber] = useState("");
  const {
    error,
    isValidOTPCode,
    onSignInWithPhoneNumber,
    confirmCode,
    confirmResult,
    testSignin,
    testConfirmCode,
    setisValidOTPCode,
  } = useContext(AuthenticationContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegistered, setuserRegistered] = useState(false);

  const handleChange = (value) => {
    setphoneNumber(value);
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (phoneNumber.match(regexp)) {
      setisValid(true);
      setErrorMsg("");
      console.log("in verify step match", phoneNumber);
    } else {
      setisValid(false);
      setErrorMsg("Enter a valid phone number");
      console.log("mismatch");
    }
  };

  const checkIfUserAlreadyRegistered = () => {
    axios
      // .get(`${BASEURL}/usersByMobileNumber/${phoneNumber}`)
      .get(`${BASEURL}/usersByMobileNumber/+16505553444`)
      .then((response) => {
        if (response.data) {
          console.log("USER EXISTS LOGIN");
          setuserRegistered(true);
          return userRegistered;
        }
      })
      .catch((err) => {
        console.log(err, "User Not Registered login");
        setuserRegistered(false);
        return userRegistered;
      });
  };

  const onSignIn = async () => {
    const isregistered = await checkIfUserAlreadyRegistered();
    if (isregistered) {
      console.log("isRegistered login");
      setisValid(true);
      setErrorMsg("");
      // onSignInWithPhoneNumber(phoneNumber, recaptchaVerifier.current);
      testSignin();
    } else {
      console.log("is not Registered login");
      setErrorMsg("Enter your registered mobile number");
      setisValid(false);
    }
  };

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
    left: 10px;
    font-size: ${(props) => props.theme.fontSizes.title};
    color: ${(props) => props.theme.colors.text.infoMessage};
    font-family: ${(props) => props.theme.fonts.body};
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
      //   backgroundColor: `${(props) => props.theme.colors.bg.primary}`,
      backgroundColor: "#ffffff",
    },
  });

  return (
    <SafeAreaView style={styles.containerView}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app.options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      {!confirmResult && !userRegistered ? (
        <>
          <Heading>We are glad to have you back.</Heading>
          <CustomTextInput
            label="Mobile Number"
            maxLength={15}
            placeholder="(+91)999989080"
            autoFocus
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            // msgToDisplay="Enter your registered mobile number"
            msgToDisplay={error || errorMsg}
            value={phoneNumber}
            onChange={handleChange}
            isValid={isValid}
            isUserNameTextInput={false}
          />
          {/* <MessageText>Enter your registered mobile number.</MessageText> */}
          <LoginButtonView>
            <Button
              label="Continue"
              handleClick={onSignIn}
              // disabled={!isValid}
            />
          </LoginButtonView>
        </>
      ) : (
        <>
          {/* <Heading>Please verfiy, its you {user.name}</Heading> */}
          <Heading>Please verfiy, its you David</Heading>
          {/* {isPinReady && !validOtpCode ? ( */}
          <OTPMessageText>
            Enter 6 digit verification code sent to the number
          </OTPMessageText>
          {/* ) : (
            <OTPMessageText>
              Please enter valid verification code.
            </OTPMessageText>
          )} */}
          <OTPInput
            code={code}
            setCode={(e) => setCode(e)}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
            isValidOTPCode={validOtpCode}
          />
          {/* <Text>
            {isPinReady && !validOtpCode ? "Please enter valid verification code" : ""}
          </Text> */}
          <LoginButtonView>
            <Button
              label="Confirm Code"
              // handleClick={() => confirmCode(code)}
              handleClick={testConfirmCode}
              // disabled={!isPinReady}
            />
          </LoginButtonView>
        </>
      )}
    </SafeAreaView>
  );
};
