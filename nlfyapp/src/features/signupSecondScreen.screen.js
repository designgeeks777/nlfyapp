import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  ScrollView,
} from "react";
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

const { height, width } = Dimensions.get("window");
const progressStepViewHeight = height * 0.5;

const MessageText = styled(Text)`
  //padding-left: 20px;
  padding-left: ${width * 0.1}px;
  align-self: flex-start;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) =>
    props.isValid
      ? props.theme.colors.text.infoMessage
      : props.theme.colors.text.errorMessage};
  font-family: ${(props) => props.theme.fonts.body};
`;

const LoadingText = styled(Text)`
  flex: 1; /* Add this line */
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.border.success};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ActivityIndicatorView = styled(View)`
  z-index: 1;
  flex-direction: row;
  justify-content: center; /* Add this line */
  align-items: center; /* Add this line */
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
    updateProfile,
    isLoading,
    isLoadingOTP,
    errorOTP,
    resetConfirmResult,
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

  const handlePhoneNumberChange = (value) => {
    setUser({ ...user, mobileNumber: value });
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (user.mobileNumber.length !== 0 && user.mobileNumber.match(regexp)) {
      setIsValidPhoneNumber(true);
      setErrorMsg("");
      console.log("in verify step match", user.mobileNumber);
    } else {
      setIsValidPhoneNumber(false);
      setErrorMsg("Enter a valid phone number");
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
  /*const onClickConfirmCode = () => {
    setResetErrors(false);
    confirmCode(otpCode);
  };*/
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

  const handleNameChange = (name) => {
    setUser({ ...user, name: name });
    console.log("handleNameChange", name, name.length);
    if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
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
      updateProfile(user.name);
      navigation.navigate("UploadPicSignUp", {
        userName: user.name,
        gender: user.gender,
      });
    }
    resetConfirmResult();
  };

  const styles = StyleSheet.create({
    progressStepViewStyle: {
      height: progressStepViewHeight * 0.6,
      alignItems: "center",
      backgroundColor: "#ffffff",
      paddingTop: width * 0.02,
    },

    containerView: {
      flex: 1,
      backgroundColor: "#ffffff",
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
      left: width * 0.12,
      justifyContent: "center",
      backgroundColor: "#E94A27",
    },

    progressStepNextButtonTextStyle: {
      color: "#ffffff",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: height * 0.001,
      lineHeight: height * 0.04,
    },

    heading: {
      color: "#F26924",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
      marginTop: width * 0.1,
    },
    OTPText: {
      top: width * 0.1,
    },

    SelectGenderText: {
      left: width * 0.05,
      top: width * 0.04,
      color: "#666666",
      alignSelf: "flex-start",
    },

    RadioButtonRow: {
      left: width * 0.03,
      top: width * 0.05,
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
          topOffset={width * 0.04}
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
                    label="Mobile Number"
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
              </TouchableWithoutFeedback>
            )}

            {Platform.OS === "android" && (
              <View style={styles.progressStepViewStyle}>
                <CustomTextInput
                  label="Mobile Number"
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
            //onNext={() => onClickConfirmCode()}
            nextBtnText="Confirm"
            previousBtnDisabled
            scrollable={false}
            previousBtnText=""
            nextBtnStyle={styles.progressStepNextButtonStyle}
            nextBtnTextStyle={styles.progressStepNextButtonTextStyle}
            //nextBtnDisabled={!isOtpCodeReady}
            nextBtnDisabled={!isValidOTPCode || isLoading}
            errors={!isValidOTPCode}
          >
            <View style={styles.progressStepViewStyle}>
              <Text style={styles.OTPText}>
                Enter 6 digit verification code sent to the number
              </Text>

              <View style={{ flex: 1 }}>
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
            <View style={styles.progressStepViewStyle}>
              <View>
                <CustomTextInput
                  label="Enter name"
                  placeholder="Sam"
                  keyboardType="default"
                  value={user.name}
                  onChange={handleNameChange}
                  isUserNameTextInput={true}
                />
              </View>

              <MessageText isValid={isValidName}>
                {isValidName || !showNameErrorMsg
                  ? ""
                  : "Let's us know what you like us to call you!"}
              </MessageText>
              <Text style={styles.SelectGenderText}>Select Gender</Text>
              <View style={styles.RadioButtonRow}>
                <RadioButton
                  value="male"
                  color={user.gender ? "#F26924" : "#666666"}
                  status={user.gender === "male" ? "checked" : "unchecked"}
                  onPress={() => {
                    setUser({ ...user, gender: "male" });
                  }}
                />
                <Text style={{ marginRight: width * 0.09 }}>Male</Text>
                <RadioButton
                  value="female"
                  status={user.gender === "female" ? "checked" : "unchecked"}
                  color={user.gender ? "#F26924" : "#666666"}
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
