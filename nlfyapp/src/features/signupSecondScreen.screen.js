import React, { useState } from "react";
import { View, Button, TextInput, Text, Dimensions } from "react-native";
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
          >
            <View style={{ alignItems: "center" }}>
              <Text>This is the content within step 2!</Text>
            </View>
          </ProgressStep>
          <ProgressStep
            label="Third Step"
            nextBtnStyle={nextBtnStyle}
            nextBtnTextStyle={nextBtnTextStyle}
            onNext={handleNext}
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
