import React, { useState, useContext, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { ProgressStep, ProgressSteps } from "react-native-progress-steps";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { CustomTextInput } from "../components/textinput";
import { SafeAreaView } from "react-native-safe-area-context";
import { OTPInput } from "../components/otpInput";
import { RadioButton } from "react-native-paper";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import * as fb from "firebase/compat";
import axios from "axios";
import { BASEURL } from "../../APIKey";
import { TouchableOpacity } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("window");
const progressStepViewHeight = height * 0.5;

const MessageText = styled(Text)`
  padding-bottom: ${(props) =>
    props.isDetails ? `${width * 0.03}px` : `${width * 0.3}px`};
  padding-left: ${(props) =>
    props.isDetails ? `${width * 0.06}px` : `${width * 0.02}px`};
  padding-top: ${(props) => (props.isDetails ? "0px" : `${width * 0.03}px`)};
  padding-right: ${(props) => (props.isDetails ? "0px" : `${width * 0.02}px`)};
  align-self: flex-start;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) =>
    props.isValid
      ? props.theme.colors.text.infoMessage
      : props.theme.colors.text.errorMessage};
  font-family: ${(props) => props.theme.fonts.body};
`;

const LoadingText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.border.success};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ActivityIndicatorView = styled(View)`
  flex-direction: row;
  justify-content: center; /* Add this line */
  align-items: center; /* Add this line */
  padding-bottom: ${width * 0.3}px;
  padding-top: ${width * 0.03}px;
`;

const ResendCodeText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.text.disabled
      : props.theme.colors.text.errorMessage};
  font-family: ${(props) => props.theme.fonts.body};
  text-decoration: underline;
`;

const CounterText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
  display: flex;
  align-self: center;
`;

export const Stepper = () => {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null);
  const attemptInvisibleVerification = useState(false);
  const {
    error,
    isValidOTPCode,
    onSignInWithPhoneNumber,
    confirmCode,
    updateProfileName,
    isLoading,
    isLoadingOTP,
    errorOTP,
    resetConfirmResult,
    confirmResult,
  } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [showNameErrorMsg, setShowNameErrorMsg] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const maximumOtpCodeLength = 6;
  const [isOtpCodeReady, setIsOtpCodeReady] = useState(false);

  const [user, setUser] = useState({
    uid: "",
    name: "",
    gender: "male",
    mobileNumber: "",
    profilePic: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [allStepsDone, setAllStepsDone] = useState(false);
  const [resetError, setResetErrors] = useState(false);
  const [seconds, setSeconds] = useState(30);

  const handlePhoneNumberChange = (value) => {
    console.log("User.phoneNumber");
    setUser({ ...user, mobileNumber: value });
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (user.mobileNumber.length !== 0 && user.mobileNumber.match(regexp)) {
      setIsValidPhoneNumber(true);
      setErrorMsg("");
      console.log("in verify step match", user.mobileNumber);
    } else {
      setIsValidPhoneNumber(false);
      setErrorMsg(
        "Enter a valid phone number with country code.Ex- +919433456789"
      );
      console.log("mismatch");
    }
  };

  useEffect(() => {
    console.log("userRegistered changed", userRegistered);
    if (userRegistered) {
      setIsValidPhoneNumber(false);
      setErrors(true);
    }
  }, [userRegistered]);

  const checkIfUserAlreadyRegistered = async () => {
    let dataexists = false;
    try {
      const response = await axios.get(`${BASEURL}/users/`);
      if (response.data) {
        const data = response.data;

        data.forEach((item) => {
          console.log("Item", item.mobileNumber);
          if (item.mobileNumber === user.mobileNumber) {
            console.log("User Exists");
            dataexists = true;
            setUserRegistered(true);
          }
        });
      } else {
        console.log("USER DOESNT EXISTS");
        setUserRegistered(false);
        dataexists = false;
      }
    } catch (err) {
      console.log(err, "User Not Registered signin");
      dataexists = false;
    }
    return dataexists;
  };

  const onVerify = async () => {
    const isRegistered = await checkIfUserAlreadyRegistered();

    console.log("userRegistered onVerify", isRegistered);
    if (isRegistered) {
      console.log("isRegistered true");
      setUserRegistered(true);
      setErrorMsg("Mobile number already registered, please log in");
      setIsValidPhoneNumber(false);
    } else {
      console.log("isRegistered false");
      setIsValidPhoneNumber(true);
      setErrorMsg("");
      onSignInWithPhoneNumber(user.mobileNumber, recaptchaVerifier.current);
    }
  };

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
    if (confirmResult && recaptchaVerifier.current && !error) {
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
  }, [confirmResult, seconds, error]);

  const handleNameChange = (name) => {
    setUser({ ...user, name: name });
    console.log("handleNameChange", name, name.length);
    if (name.length > 0 && name.length <= 15 && /^[A-Za-z\s]*$/.test(name)) {
      setIsValidName(true);
      setShowNameErrorMsg(false);
    } else {
      setIsValidName(false);
      setShowNameErrorMsg(true);
    }
  };

  const onSubmitUser = () => {
    console.log("length", user.name.length, isValidName, user.name);
    if (user.name.length === 0) {
      setIsValidName(false);
      setShowNameErrorMsg(true);
    } else {
      setAllStepsDone(true);
      setIsValidName(true);
      setShowNameErrorMsg(false);
      updateProfileName(user.name.trim());
      navigation.navigate("UploadPicSignUp", {
        userName: user.name.trim(),
        gender: user.gender,
      });
    }
    resetConfirmResult();
  };

  const resendCode = () => {
    console.log("call signinwithphone number again");
    onSignInWithPhoneNumber(user.mobileNumber, recaptchaVerifier.current);
    setResetErrors(true);
    setSeconds(30);
    setOtpCode("");
  };

  const styles = StyleSheet.create({
    progressStepViewStyle: {
      height: progressStepViewHeight * 0.55,
      alignItems: "center",
      backgroundColor: "#ffffff",
      paddingTop: width * 0.001,
    },

    containerView: {
      flex: 1,
      backgroundColor: "#ffffff",
    },

    centeredContainer: {
      flex: 1,
      alignItems: "center",
    },

    containerProgressSteps: {
      paddingTop: width * 0.02,
      flex: 1,
    },

    progressStepNextButtonStyle: {
      fontSize: 18,
      borderRadius: 50,
      width: width * 0.9,
      height: height * 0.08,
      left: width * 0.09,
      alignSelf: "center",
      alignItems: "center",
      backgroundColor: "#D03925",
      justifyContent: "center",
    },

    progressStepNextButtonTextStyle: {
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: height * 0.001,
      lineHeight: height * 0.04,
    },

    heading: {
      color: "#D03925",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginTop: width * 0.1,
    },
    OTPText: {
      top: height * 0.02,
    },

    SelectGenderText: {
      left: width * 0.07,
      top: width * 0.001,
      color: "#666666",
      alignSelf: "flex-start",
    },

    RadioButtonRow: {
      left: width * 0.04,
      top: width * 0.01,
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      justifyContent: "flex-start",
    },
    borderStyleBase: {
      width: 30,
      height: 45,
    },

    borderStyleHighLighted: {
      borderColor: "#03DAC6",
    },

    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
      borderColor: "#03DAC6",
    },

    centeredContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: width * 0.05,
      top: width * 0.1,
    },
  });

  return (
    <SafeAreaView style={styles.containerView}>
      <FirebaseRecaptchaVerifierModal
        id="recaptcha-container"
        ref={recaptchaVerifier}
        firebaseConfig={fb.app.options}
        attemptInvisibleVerification={false}
      />
      <View style={styles.containerProgressSteps}>
        <Text style={styles.heading}>Sign Up with Mobile Number</Text>
        <ProgressSteps
          topOffset={width * 0.06}
          marginBottom={width * 0.1}
          activeLabelColor="#000000"
          activeLabelFontSize={width * 0.03}
          labelFontSize={width * 0.03}
          completedLabelColor="lightgray"
          activeStepNumColor="#4bb543"
          disabledStepNumColor="transparent"
          completedCheckColor="#ffffff"
          completedStepIconColor="#4bb543"
          isComplete={allStepsDone}
        >
          <ProgressStep
            label="Number"
            scrollable={false}
            previousBtnDisabled
            previousBtnText=""
            onNext={() => onVerify()}
            nextBtnText="Verify"
            nextBtnStyle={styles.progressStepNextButtonStyle}
            nextBtnTextStyle={styles.progressStepNextButtonTextStyle}
            nextBtnDisabled={!isValidPhoneNumber}
            errors={errors}
          >
            {Platform.OS === "ios" && (
              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
              >
                <View style={styles.progressStepViewStyle}>
                  <CustomTextInput
                    label="Mobile Number with country code(+919433474532)"
                    placeholder="+91999989080"
                    keyboardType="phone-pad"
                    autoFocus
                    autoCompleteType="tel"
                    textContentType="telephoneNumber"
                    msgToDisplay={error || errorMsg}
                    value={user.phnnumber}
                    onChange={handlePhoneNumberChange}
                    isValid={isValidPhoneNumber}
                    maxLength={15}
                    isUserNameTextInput={false}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}

            {Platform.OS === "android" && (
              <View style={styles.progressStepViewStyle}>

                <CustomTextInput
                  label="Mobile Number with country code(+919433474532)"
                  placeholder="+91999989080"
                  keyboardType="phone-pad"
                  autoFocus
                  autoCompleteType="tel"
                  textContentType="telephoneNumber"
                  msgToDisplay={error || errorMsg}
                  value={user.mobileNumber}
                  onChange={handlePhoneNumberChange}
                  isValid={isValidPhoneNumber}
                  maxLength={15}
                  isUserNameTextInput={false}
                />
              </View>
            )}
          </ProgressStep>
          <ProgressStep
            label="Verify"
            nextBtnText="Confirm"
            previousBtnDisabled
            scrollable={false}
            previousBtnText=""
            nextBtnStyle={styles.progressStepNextButtonStyle}
            nextBtnTextStyle={styles.progressStepNextButtonTextStyle}
            nextBtnDisabled={!isValidOTPCode || isLoading}
            errors={!isValidOTPCode}
          >
            <View style={styles.progressStepViewStyle}>
              <Text style={styles.OTPText}>
                Enter 6 digit verification code sent to the number
              </Text>

              <View style={styles.centeredContent}>
                <OTPInput
                  code={otpCode}
                  setCode={setOtpCode}
                  maximumLength={maximumOtpCodeLength}
                  isValidOTPCode={isValidOTPCode}
                  resetError={resetError}
                />
                {/* {seconds > 0 && !error && (
                  <CounterText>
                    Time Remaining: 00:
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </CounterText>
                )} */}
                {!error && (
                  <CounterText>
                    Didn't recieve code?{" "}
                    <TouchableOpacity
                      disabled={seconds > 0}
                      onPress={() => resendCode()}
                    >
                      <ResendCodeText disabled={seconds > 0}>
                        Resend
                      </ResendCodeText>
                    </TouchableOpacity>
                  </CounterText>
                )}
                {seconds > 0 && error && (
                  <Text style={{ fontSize: 12, color: "#DE1621" }}>
                    {error}
                  </Text>
                )}
                {isLoadingOTP ? (
                  <ActivityIndicatorView>
                    <LoadingText>Validating OTP</LoadingText>
                    <ActivityIndicator color="#27AE60" />
                  </ActivityIndicatorView>
                ) : (
                  <MessageText isDetails={false}>
                    {isOtpCodeReady && !isValidOTPCode && !resetError
                      ? errorOTP
                      : ""}
                  </MessageText>
                )}
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Details"
            nextBtnStyle={styles.progressStepNextButtonStyle}
            nextBtnTextStyle={styles.progressStepNextButtonTextStyle}
            finishBtnText="Let's Go"
            previousBtnText=""
            previousBtnDisabled
            scrollable={false}
            onSubmit={() => onSubmitUser()}
          >
            <View
              style={[
                styles.progressStepViewStyle,
                { marginBottom: width * 0.1 },
              ]}
            >
              <CustomTextInput
                label="Enter name (maximum 15 letters)"
                placeholder="Sam"
                keyboardType="default"
                value={user.name}
                onChange={handleNameChange}
                isUserNameTextInput={true}
                maxLength={15}
              />

              <MessageText isDetails={true} isValid={isValidName}>
                {isValidName || !showNameErrorMsg
                  ? ""
                  : user.name.length > 0
                  ? /^[A-Za-z\s]*$/.test(user.name)
                    ? ""
                    : "Username can only contain letters"
                  : "Let's us know what you like us to call you!"}
              </MessageText>

              <Text style={styles.SelectGenderText}>Select Gender</Text>

              <View style={styles.RadioButtonRow}>
                <RadioButton
                  value="male"
                  color={user.gender ? "#D03925" : "#666666"}
                  status={user.gender === "male" ? "checked" : "unchecked"}
                  onPress={() => {
                    setUser({ ...user, gender: "male" });
                  }}
                />
                <Text style={{ marginRight: width * 0.09 }}>Male</Text>
                <RadioButton
                  value="female"
                  status={user.gender === "female" ? "checked" : "unchecked"}
                  color={user.gender ? "#D03925" : "#666666"}
                  onPress={() => {
                    setUser({ ...user, gender: "female" });
                  }}
                />
                <Text>Female</Text>
              </View>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </SafeAreaView>
  );
};
