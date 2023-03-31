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
import { RadioButton, TextInput } from "react-native-paper";
import styled from "styled-components";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import * as fb from "firebase/compat";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import axios from "axios";
//import { BASEURL } from "../../APIKey";

const { height, width } = Dimensions.get("window");
const containerHeight = height * 0.1;
const progressStepViewHeight = height * 0.5;
const containerWidth = width * 0.9;

const MessageText = styled(Text)`
  padding-left: 20px;
  align-self: flex-start;
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) =>
    props.isValid
      ? props.theme.colors.text.infoMessage
      : props.theme.colors.text.errorMessage};
  font-family: ${(props) => props.theme.fonts.body};
`;
const BASEURL = "http://192.168.0.102:3000/api/";
export const Stepper = () => {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null);
  const attemptInvisibleVerification = useState(false);
  const {
    // user,
    error,
    isValidOTPCode,
    onSignInWithPhoneNumber,
    confirmCode,
    updateProfile,
  } = useContext(AuthenticationContext);
  const [errors, setErrors] = useState(false);
  const [isValidPhoneNumber, setisValidPhoneNumber] = useState(false);
  const [isValidName, setisValidName] = useState(false);
  const [showNameErrorMsg, setshowNameErrorMsg] = useState(false);
  const [otpCode, setOTPCode] = useState("");
  const maximumCodeLength = 6;
  const [isPinReady, setIsPinReady] = useState(false);
  const [user, setUser] = useState({
    uid: "",
    name: "",
    gender: "male",
    mobileNumber: "",
    profilePic: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [userRegistered, setuserRegistered] = useState(false);
  const [allStepsDone, setAllStepsDone] = useState(false);

  const handlePhoneNumberChange = (value) => {
    setUser({ ...user, mobileNumber: value });
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
    if (user.mobileNumber.length !== 0 && user.mobileNumber.match(regexp)) {
      setisValidPhoneNumber(true);
      setErrorMsg("");
      console.log("in verify step match", user.mobileNumber);
    } else {
      setisValidPhoneNumber(false);
      setErrorMsg("Enter a valid phone number");
      console.log("mismatch");
    }
  };

  useEffect(() => {
    console.log("userRegistered changed", userRegistered);
    if (userRegistered) {
      setisValidPhoneNumber(false);
      setErrors(true);
    }
  }, [userRegistered]);

  const checkIfUserAlreadyRegistered = async () => {
    let dataexists = false;
    try {
      /*console.log(
        "User mobile Number in checkIfUserAlreadyExists:",
        user.mobileNumber
      );
      const url = `${BASEURL}users/${user.mobileNumber}`;
      console.log("Calling URL :", url);*/
      const response = await axios.get(`${BASEURL}/users/`);
      console.log("USER EXISTS piena", response.data);

      if (response.data) {
        const data = response.data;

        data.forEach((item) => {
          console.log("Item", item.mobileNumber);
          if (item.mobileNumber === user.mobileNumber) {
            console.log("User Exists");
            dataexists = true;
            setuserRegistered(true);
          }
        });
        //console.log("USER EXISTS");
        console.log("Response:", response.data);
        //setuserRegistered(true);
        //return true;
      } else {
        console.log("USER DOESNT EXISTS");
        setuserRegistered(false);
        dataexists = false;
      }
    } catch (err) {
      console.log(err, "User Not Registered signin");
      //setuserRegistered(false);
      dataexists = false;
    }
    return dataexists;
  };

  const onVerify = async () => {
    const isRegistered = await checkIfUserAlreadyRegistered();

    console.log("userRegistered onVerify", isRegistered);
    if (isRegistered) {
      console.log("isRegistered true");
      setuserRegistered(true);
      setErrorMsg("Mobile number already registered, please log in");
      setisValidPhoneNumber(false);
    } else {
      console.log("isRegistered false");
      setisValidPhoneNumber(true);
      setErrorMsg("");
      onSignInWithPhoneNumber(user.mobileNumber, recaptchaVerifier.current);
    }
  };

  const handleNameChange = (name) => {
    setUser({ ...user, name: name });
    console.log("handleNameChange", name, name.length);
    if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
      setisValidName(true);
    } else {
      setisValidName(false);
    }
  };

  const onSubmitUser = () => {
    console.log("length", user.name.length, isValidName, user.name);
    if (user.name.length === 0) {
      setisValidName(false);
      setshowNameErrorMsg(true);
    } else {
      setAllStepsDone(true);
      setisValidName(true);
      setshowNameErrorMsg(false);
      updateProfile(user.name);
      navigation.navigate("UploadPicSignUp", {
        userName: user.name,
        gender: user.gender,
      });
    }
  };

  // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  const styles = StyleSheet.create({
    progressStepViewStyle: {
      // height: 300,
      height: progressStepViewHeight,
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
      fontSize: 18,
      borderRadius: 50,
      width: containerWidth,
      height: containerHeight,
      left: 42,
      justifyContent: "center",
      backgroundColor: "#E94A27",
    },
    progressStepNextButtonTextStyle: {
      color: "#FFFFFF",
      textAlign: "center",
      fontWeight: "bold",
      letterSpacing: 0.25,
      lineHeight: 21,
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

  /*const isUserRegistered = async () => {
    const phnNumber = user.mobileNumber;
    console.log("User mobile number in isUserRegistered:", phnNumber);
    const isRegistered = await checkIfUserAlreadyRegistered();
    console.log("In checkUserRegistered - isRegistered:", isRegistered);
    return isRegistered;
  };*/

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
            <View style={styles.progressStepViewStyle}>
              <CustomTextInput
                label="Mobile Number"
                placeholder="(+91)999989080"
                keyboardType="phone-pad"
                autoFocus
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                // msgToDisplay="Enter a valid phone number"
                msgToDisplay={error || errorMsg}
                value={user.mobileNumber}
                onChange={handlePhoneNumberChange}
                isValid={isValidPhoneNumber}
                maxLength={15}
                isUserNameTextInput={false}
              />
              {/* <MessageText>
                {user.mobileNumber === null ||
                user.mobileNumber === undefined ||
                user.mobileNumber === "" ||
                isValidPhoneNumber
                  ? ""
                  : errorMsg}
              </MessageText> */}
            </View>
          </ProgressStep>
          <ProgressStep
            label="Verify"
            onNext={() => confirmCode(otpCode)}
            nextBtnText="Confirm"
            previousBtnDisabled
            scrollable={false}
            previousBtnText=""
            nextBtnStyle={styles.progressStepNextButtonStyle}
            nextBtnTextStyle={styles.progressStepNextButtonTextStyle}
            // nextBtnDisabled={!isValidOTPCode}
            errors={!isValidOTPCode}
          >
            <View style={styles.progressStepViewStyle}>
              <Text style={styles.OTPText}>
                Enter 6 digit verification code sent to the number
              </Text>
              <OTPInput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setIsPinReady}
                isValidOTPCode={isValidOTPCode}
              />
              <MessageText>
                {otpCode.length === maximumCodeLength && !isValidOTPCode
                  ? error
                  : ""}
              </MessageText>
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
              <CustomTextInput
                label="Enter name"
                placeholder="Sam"
                keyboardType="default"
                // msgToDisplay="Let's us know what you like us to call you!"
                value={user.name}
                // isValid={isValidName}
                onChange={handleNameChange}
                isUserNameTextInput={true}
              />
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
                <Text style={{ marginRight: 40 }}>Male</Text>
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
