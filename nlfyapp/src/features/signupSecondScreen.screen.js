import React, { useState, useRef } from "react";
import {
  View,
  Button,
  TextInput,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import styled from "styled-components";

const { width } = Dimensions.get("window");
const nextWidth = width * 0.9;

const HeaderText = styled(Text)`
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  alignitems: center;
  underlinecolorandroid: "transparent";
`;

const ProgressStepView = styled(View)`
  flex: 1;
  z-index: 1;
`;

const Input = styled(TextInput)`
  border-radius: 10px;
  border-width: ${(props) => props.borderWidth}px;
  border-color: ${(props) => props.borderColor};
  padding: 10px;
  width: ${nextWidth}px;
  height: 56px;
  top: 10px;
  z-index: 0;
`;

const Label = styled(Text)`
  color: #666666;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  top: 10px;
`;

const TextSecondScreen = styled(Text)`
  color: #666666;
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  top: 10px;
`;

const Container = styled(View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding-top: 80px;
`;

const SupportText = styled(Text)`
  color: ${(props) =>
    props.isValid ? "#27AE60" : props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
  top: 10px;
  z-index: 2;
  padding-bottom: 20px;
`;

const nextBtnStyle = {
  backgroundColor: "#E94A27",
  borderRadius: 50,
  height: 56,
  marginTop: 20,
  marginBottom: 60,
  alignItems: "center",
  justifyContent: "center",
  width: nextWidth,
  left: 60,
};

const nextBtnTextStyle = {
  color: "#FFFFFF",
  fontSize: 18,
  fontWeight: "bold",
};

export const Stepper = () => {
  const [stepCount, setStepCount] = useState(0);
  const [borderColor, setBorderColor] = useState("#D3D3D3");
  const [borderWidth, setBorderWidth] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);

  const otpRef1 = useRef(null);
  const otpRef2 = useRef(null);
  const otpRef3 = useRef(null);

  const [supportText, setSupportText] = useState(
    "Please enter a valid mobile number"
  );

  const handleNext = () => {
    setStepCount(stepCount + 1);
  };

  const handleFocus = () => {
    setBorderColor("#000000");
    setBorderWidth(2);
    setIsValidPhoneNumber(validatePhoneNumber(phoneNumber));
  };

  const handleBlur = () => {
    if (phoneNumber.length === 9 && validatePhoneNumber(phoneNumber)) {
      setBorderColor("#27AE60");
      setSupportText("Valid Phone number");
      setIsValidPhoneNumber(true);
    } else {
      setBorderColor("#D3D3D3");
      setIsValidPhoneNumber(false);
      setSupportText("Please enter a valid mobile number");
    }
    setBorderWidth(1);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const isValid = /^\d{9}$/.test(phoneNumber);
    return isValid;
  };

  const handleOtpChange = (index, value) => {
    const newOtp = otp.substring(0, index) + value + otp.substring(index + 1);
    setOtp(newOtp);
    if (newOtp.length === 3) {
      setIsOtpValid(true);
    } else {
      setIsOtpValid(false);
    }
    if (index === 0) {
      otpRef2.current.focus();
    } else if (index === 1) {
      otpRef3.current.focus();
    }
    console.log(otp);
  };

  return (
    <Container>
      <View>
        <HeaderText>Sign Up with Mobile Number..</HeaderText>
      </View>
      <ProgressStepView>
        <ProgressSteps currentStep={stepCount}>
          <ProgressStep
            label="First Step"
            nextBtnStyle={nextBtnStyle}
            nextBtnTextStyle={nextBtnTextStyle}
            onNext={handleNext}
            previousBtnDisabled={true}
            previousBtnText={null}
          >
            <View style={{ alignItems: "center" }}>
              <View>
                <Label>Mobile Number *</Label>
                <Input
                  placeholder="+91999999999"
                  keyboardType="numeric"
                  borderColor={borderColor}
                  borderWidth={borderWidth}
                  onFocus={handleFocus}
                  onChangeText={(text) => setPhoneNumber(text)}
                  onChange={handleBlur}
                  value={phoneNumber}
                />

                <SupportText isValid={isValidPhoneNumber}>
                  {supportText}
                </SupportText>
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Second Step"
            nextBtnStyle={nextBtnStyle}
            nextBtnTextStyle={nextBtnTextStyle}
            onNext={handleNext}
            previousBtnDisabled={true}
            previousBtnText={null}
          >
            <View style={{ alignItems: "center" }}>
              <TextSecondScreen>
                Enter 6 digit OTP sent to the number
              </TextSecondScreen>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <TextInput
                  style={[
                    styles.input,
                    isOtpValid ? styles.inputBoxValid : styles.inputBoxInvalid,
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleOtpChange(0, value)}
                  value={otp.charAt(0)}
                  ref={otpRef1}
                  onSubmitEditing={() => otpRef2.current.focus()}
                  autoFocus
                />
                <TextInput
                  style={[
                    styles.input,
                    isOtpValid ? styles.inputBoxValid : styles.inputBoxInvalid,
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleOtpChange(1, value)}
                  value={otp.charAt(1)}
                  ref={otpRef2}
                  onSubmitEditing={() => otpRef3.current.focus()}
                />
                <TextInput
                  style={[
                    styles.input,
                    isOtpValid ? styles.inputBoxValid : styles.inputBoxInvalid,
                  ]}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleOtpChange(2, value)}
                  value={otp.charAt(2)}
                  ref={otpRef3}
                />
              </View>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Third Step"
            nextBtnStyle={nextBtnStyle}
            nextBtnTextStyle={nextBtnTextStyle}
            onNext={handleNext}
            previousBtnDisabled={true}
            previousBtnText={null}
          >
            <View style={{ alignItems: "center" }}>
              <Text>This is the content within step 3!</Text>
            </View>
          </ProgressStep>
        </ProgressSteps>
      </ProgressStepView>
    </Container>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 4,
    width: 40,
    height: 40,
    textAlign: "center",
    borderColor: "#CCCCCC",
  },
  inputBoxValid: {
    borderColor: "#27AE60",
  },
  inputBoxInvalid: {
    borderColor: "#CCCCCC",
  },
});
