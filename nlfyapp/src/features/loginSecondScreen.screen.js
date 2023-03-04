import React, { useState, useContext, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import * as firebase from "firebase/compat";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { CustomTextInput } from "../components/textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import { OTPInput } from "../components/otpInput";
import styled from "styled-components";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;

export const LoginSecondScreen = (props) => {
  const navigation = useNavigation();
  const recaptchaVerifier = React.useRef(null);
  const attemptInvisibleVerification = useState(true);
  const [user, setUser] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [isValid, setisValid] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState("");
  const maximumCodeLength = 6;
  const [validOtpCode, setValidOtpCode] = useState(false);
  const [isPinReady, setIsPinReady] = useState(false);

  //   const [phoneNumber, setphoneNumber] = useState("");

  const handleChange = (value) => {
    setMobile(value);
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (mobile.match(regexp)) {
      setisValid(true);
      console.log("in verify step match", mobile);
    } else {
      setisValid(false);
      console.log("mismatch");
    }
  };

  const signInWithMobileNumber = () => {
    console.log("came here", recaptchaVerifier.current);
    // const confirmation = await firebase.auth().signInWithPhoneNumber(mobile);
    // setConfirm(confirmation);
    if (isValid) {
      firebase
        .auth()
        .signInWithPhoneNumber(mobile, recaptchaVerifier.current)
        .then((confirmationResult) => {
          setConfirm(confirmationResult);
          var credential = firebase.auth.PhoneAuthProvider.credential(
            confirmationResult.verificationId,
            code
          );
          console.log("credential", credential);
          setIsPinReady(true);
        })
        .catch((e) => {
          setIsPinReady(false);
          setisValid(false);
          console.log("ERROR SIGN IN", e);
        });
    } else {
      setisValid(false);
      console.log("ERROR SIGN IN else block");
    }
  };

  const confirmCode = () => {
    // try {
    if (isPinReady) {
      confirm
        .confirm(code)
        .then((u) => {
          setIsPinReady(true);
          setValidOtpCode(true);
          setUser(u);
          navigation.navigate("Home");
        })
        .catch((e) => {
          console.log("ERROR Code", e);
        });
    } else {
      setValidOtpCode(false);
      console.log("Else block error Code");
    }
    // } catch (error) {
    //   console.log("Invalid code.");
    // }
  };

  const signOut = () => {
    firebase.auth().signOut();
    setUser(null);
    setCode(null);
    setMobile(null);
    // navigation.navigate("Home");
    // return () => useRef();
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
  return (
    <WrapperView>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebase.app.options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      {!confirm ? (
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
            msgToDisplay="Enter your registered mobile number"
            value={mobile}
            onChange={handleChange}
            isValid={isValid}
            isUserNameTextInput={false}
          />
          {/* <MessageText>Enter your registered mobile number.</MessageText> */}
          <LoginButtonView>
            <Button label="Continue" handleClick={signInWithMobileNumber} />
          </LoginButtonView>
        </>
      ) : (
        <>
          <Heading>Please verfiy, its you David</Heading>
          <OTPMessageText>
            Enter 4 digit verification code sent to the number
          </OTPMessageText>
          <OTPInput
            code={code}
            setCode={(e) => setCode(e)}
            maximumLength={maximumCodeLength}
            setIsPinReady={setIsPinReady}
            isValidOTPCode={validOtpCode}
          />
          <LoginButtonView>
            <Button
              label="Confirm Code"
              handleClick={confirmCode}
              isLoginButton={true}
            />
          </LoginButtonView>
        </>
      )}
    </WrapperView>
  );
};
