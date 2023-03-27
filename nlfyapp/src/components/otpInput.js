import React, { useEffect, useRef, useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";
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
  margin: 28px 0px 28px 0px;
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
  min-width: 50px;
  ${({ isValid, code }) =>
    isValid
      ? `
  border-color: #27AE60;
`
      : code === null || code === undefined || code === ""
      ? `
      border-color: #D9D9D9;
      `
      : `
border-color: #DE1621;
`};
`;

// ${({ isValid, value }) =>
//   isValid
//     ? `
// border-color: #27AE60;
// `
//     : value === null || value === undefined || value === ""
//     ? `
//     border-color: #D9D9D9;
//     `
//     : `
// border-color: #DE1621;
// `}
const SplitBoxText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
`;

const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: ${(props) =>
    props.isValid
      ? // ? props.code === null || props.code === undefined || props.code === ""
        props.theme.colors.border.success
      : // : props.theme.colors.border.error
        props.theme.colors.border.error};
  background-color: transparent;
`;

// const MessageText = styled(Text)`
//   top: 8px;
//   color: ${(props) => props.theme.colors.text.primary};
//   font-family: ${(props) => props.theme.fonts.body};
//   font-size: ${(props) => props.theme.fontSizes.caption};
//   font-weight: ${(props) => props.theme.fontWeights.regular};
// `;

export const OTPInput = ({ code, setCode, maximumLength, isValidOTPCode }) => {
  // console.log("inOTPINPUT", isValidOTPCode);
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
    return (
      <StyledSplitBoxes key={index} isValid={isValidOTPCode} value={code}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isPinReady, setIsPinReady] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    if (code.length === maximumLength) {
      setIsPinReady(true);
    } else {
      setIsPinReady(false);
    }
    console.log("isPinReady", isPinReady);
    // clean up function
    // return () => {
    //   setIsPinReady(false);
    //   console.log("isPinReady clean up", isPinReady);
    // };
  }, [code, maximumLength, isPinReady, setIsPinReady]);

  return (
    <OTPInputContainer>
      {/* <MessageText>
        Enter 6 digit verification code sent to the number
      </MessageText> */}
      <SplitOTPBoxesContainer>{boxArray.map(boxDigit)}</SplitOTPBoxesContainer>
      <TextInputHidden
        isValid={isValidOTPCode}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onFocus={handleOnPress}
        onBlur={handleOnBlur}
        keyboardType="number-pad"
      />
    </OTPInputContainer>
  );
};
