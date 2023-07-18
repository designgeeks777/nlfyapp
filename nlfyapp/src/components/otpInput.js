import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import styled from "styled-components/native";

const OTPInputContainer = styled(View)`
  top: 20px;
  justify-content: center;
  align-items: center;
`;

const TextInputHidden = styled(TextInput)`
  width: 300px;
  border-color: #e5e5e5;
  border-width: 1px;
  border-radius: 5px;
  padding: 12px;
  position: absolute;
  opacity: 0;
`;

const SplitOTPBoxesContainer = styled(Pressable)`
  margin: 28px 20px 0px 0px;
  padding: 0px 20px 0px 20px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const SplitBoxes = styled(View)`
  border-color: ${(props) => props.theme.colors.border.primary};
  border-width: 1px;
  border-radius: 10px;
  padding: 12px;
  margin: 2px;
  min-width: 46px;
  ${({ isValid, value, maxLength, resetError }) =>
    value.length < maxLength ||
    (value.length === maxLength && isValid === null) ||
    resetError
      ? `
  border-color: #D9D9D9;
`
      : isValid
      ? `
    border-color: #27AE60;
    `
      : `
border-color: #DE1621;
`};
`;

const SplitBoxText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
`;

const SplitBoxesFocused = styled(SplitBoxes)`
  background-color: transparent;
  ${({ isValid, value, maxLength, resetError }) =>
    value.length < maxLength ||
    (value.length === maxLength && isValid === null) ||
    resetError
      ? `
border-color: #000000;
`
      : isValid
      ? `
  border-color: #27AE60;
  `
      : `
border-color: #DE1621;
`};
`;
export const OTPInput = ({
  code,
  setCode,
  maximumLength,
  isValidOTPCode,
  resetError,
}) => {
  // console.log("inOTPINPUT", isValidOTPCode, code);
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();
  const boxDigit = (_, index) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
    // console.log("IN SPLIT BOXES", isValidOTPCode, code.length, maximumLength);
    return (
      <StyledSplitBoxes
        key={index}
        isValid={isValidOTPCode}
        value={code}
        maxLength={maximumLength}
        resetError={resetError}
      >
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  return (
    <View style={{ height: 120 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <OTPInputContainer>
          <SplitOTPBoxesContainer>
            {boxArray.map(boxDigit)}
          </SplitOTPBoxesContainer>
          <TextInputHidden
            isValid={isValidOTPCode}
            value={code}
            onChangeText={setCode}
            maxLength={maximumLength}
            ref={inputRef}
            onFocus={handleOnPress}
            onBlur={handleOnBlur}
            keyboardType="number-pad"
            caretHidden={true}
          />
        </OTPInputContainer>
      </ScrollView>
    </View>
  );
};
