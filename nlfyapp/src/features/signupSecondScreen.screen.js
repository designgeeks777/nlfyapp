import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { CustomTextInput } from "../components/textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import { OTPInput } from "../components/otpInput";
import { RadioButton } from "react-native-paper";
import styled from "styled-components";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import * as fb from "firebase/compat";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const { height } = Dimensions.get("window");
const containerHeight = height * 0.4;

export const Stepper = (props) => {
  const recaptchaVerifier = useRef(null);
  const {
    user,
    isLoading,
    isOTPReady,
    error,
    confirm,
    validOtpCode,
    setisOTPReady,
    onSignInWithPhoneNumber,
    confirmCode,
    onLogout,
  } = useContext(AuthenticationContext);

  const attemptInvisibleVerification = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [isValid, setisValid] = useState(false);
  const [otpCode, setOTPCode] = useState("");
  const maximumCodeLength = 6;

  const [state, setStateUser] = useState({
    user: "",
    checked: "male",
    showLastButton: false,
  });

  const navigation = useNavigation();

  const handleTextChange = (name) => {
    setStateUser({ ...state, user: name });
  };

  const handleChange = (value) => {
    setphoneNumber(value);
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (phoneNumber.match(regexp)) {
      setisValid(true);
      console.log("in verify step match", phoneNumber);
    } else {
      setisValid(false);
      console.log("mismatch");
    }
  };

  const onSubmitUser = () => {
    navigation.navigate("UploadPicSignUp", {
      userName: state.user,
      gender: state.checked,
    });
    // navigation.setParams({ userName: state.user, gender: state.checked });
    // setStateUser({ showLastButton: true });
    console.log({ state });
  };

  // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const styles = StyleSheet.create({
    progressStepViewStyle: {
      height: 300,
      // height: containerHeight,
      alignItems: "center",
      // backgroundColor: "#ececec",
    },
    containerView: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    containerProgressSteps: {
      flex: 1,
    },
    progressStepNextButtonStyle: {
      top: 14,
      fontSize: 18,
      padding: 16,
      borderRadius: 50,
      width: 320,
      height: 56,
      left: 44,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#FFFFFF",
      backgroundColor: "#E94A27",
      fontWeight: "bold",
      letterSpacing: 0.25,
      lineHeight: 21,
      // backgroundImage: "linear-gradient(180deg, #E94A27 41.07%, #F26924 100%)",
    },
    disabledProgressStepNextButtonStyle: {
      fontSize: 18,
      padding: 16,
      borderRadius: 50,
      width: 300,
      height: 56,
      left: 32,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      color: "#ECECEC",
      backgroundImage: "linear-gradient(180deg, #E94A27 41.07%, #F26924 100%)",
      backgroundColor: "#FFFFFF",
      borderColor: "#ECECEC",
      borderWidth: 1,
    },
    heading: {
      color: "#F26924",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginTop: 28,
    },
    OTPText: { top: 8 },
    // RadioGroupRow: { flex: 2, backgroundColor: "#ECECEC" },
    SelectGenderText: {
      left: 20,
      top: 16,
      color: "#666666",
      alignSelf: "flex-start",
    },
    RadioButtonRow: {
      left: 12,
      top: 20,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      justifyContent: "flex-start",
    },
  });

  return (
    <SafeAreaView style={styles.containerView}>
      <FirebaseRecaptchaVerifierModal
        id="recaptcha-container"
        ref={recaptchaVerifier}
        firebaseConfig={fb.app.options}
        attemptInvisibleVerification={attemptInvisibleVerification}
      />
      <View style={styles.containerProgressSteps}>
        <Text style={styles.heading}>Sign Up with Mobile Number</Text>
        <ProgressSteps
          topOffset={20}
          marginBottom={28}
          activeLabelColor="#000000"
          activeLabelFontSize={10}
          labelFontSize={10}
          completedLabelColor="lightgray"
          activeStepNumColor="#4bb543"
          disabledStepNumColor="transparent"
          completedCheckColor="#ffffff"
          completedStepIconColor="#4bb543"
        >
          <ProgressStep
            id="sign-in-button"
            label="Number"
            scrollable={false}
            onNext={() =>
              onSignInWithPhoneNumber(phoneNumber, recaptchaVerifier)
            }
            nextBtnText="Verify"
            nextBtnTextStyle={
              // isValid
              styles.progressStepNextButtonStyle
              // : styles.disabledProgressStepNextButtonStyle
            }
            // nextBtnDisabled={!isValid}
            // errors={!isValid}
          >
            <View style={styles.progressStepViewStyle}>
              {/* <Text>Number</Text> */}
              {/* <Button label="Verfiy" /> */}
              <CustomTextInput
                label="Mobile Number"
                placeholder="(+91)999989080"
                keyboardType="phone-pad"
                autoFocus
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                // msgToDisplay="Enter a valid phone number"
                msgToDisplay={error}
                value={phoneNumber}
                onChange={handleChange}
                isValid={isValid}
                // isValid={isOTPReady}
                maxLength={15}
                isUserNameTextInput={false}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Verify"
            onNext={() => confirmCode(otpCode)}
            nextBtnText="Confirm"
            previousBtnDisabled
            scrollable={false}
            previousBtnText=""
            nextBtnTextStyle={
              //   isValid
              styles.progressStepNextButtonStyle
              //     : styles.disabledProgressStepNextButtonStyle
            }
            // nextBtnDisabled={!isValid}
            // errors={!validOtpCode}
          >
            <View style={styles.progressStepViewStyle}>
              <Text style={styles.OTPText}>
                Enter 6 digit verification code sent to the number
              </Text>
              <OTPInput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setisOTPReady}
                isValidOTPCode={validOtpCode}
              />
            </View>
          </ProgressStep>
          <ProgressStep
            label="Details"
            // nextBtnStyle={styles.progressStepNextButtonStyle}
            // finishBtnText="Let's Go"
            previousBtnText=""
            previousBtnDisabled
            scrollable={false}
            removeBtnRow
          >
            <View style={styles.progressStepViewStyle}>
              <CustomTextInput
                label="Enter name"
                placeholder="Sam"
                keyboardType="default"
                msgToDisplay="Let's us know what you like us to call you!"
                value={state.user}
                onChange={handleTextChange}
                isUserNameTextInput={true}
              />
              <Text style={styles.SelectGenderText}>Select Gender</Text>
              <View style={styles.RadioButtonRow}>
                <RadioButton
                  value="male"
                  color={state.checked ? "#F26924" : "#666666"}
                  status={state.checked === "male" ? "checked" : "unchecked"}
                  onPress={() => {
                    setStateUser({ ...state, checked: "male" });
                  }}
                />
                <Text style={{ marginRight: 40 }}>Male</Text>
                <RadioButton
                  value="female"
                  status={state.checked === "female" ? "checked" : "unchecked"}
                  color={state.checked ? "#F26924" : "#666666"}
                  onPress={() => {
                    setStateUser({ ...state, checked: "female" });
                  }}
                />
                <Text>Female</Text>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
      {/* {state.showLastButton && ( */}
      <Button
        isSignUpLastButton={state.showLastButton}
        label="Let's Go"
        handleClick={onSubmitUser}
      />
      {/* )} */}
    </SafeAreaView>
  );
};
