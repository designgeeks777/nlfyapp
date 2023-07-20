import React, { useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const containerWidth = width * 0.9;
const containerHeight = height * 0.08;

const Container = styled(View)`
  width: ${containerWidth}px;
`;

const HeadingWrapperView = styled(View)`
  flex-direction: row;
`;

const MobileNumberText = styled(Text)`
  top: ${width * 0.02}px;
  left: ${width * 0.02}px;
  color: ${(props) => props.theme.colors.text.caption};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

const Mandatory = styled(Text)`
  top: ${width * 0.01}px;
  left: ${width * 0.02}px;
  color: ${(props) => props.theme.colors.text.secondary};
`;

const ErrorText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.errorMessage};
  font-family: ${(props) => props.theme.fonts.body};
`;

const MessageText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.title};
  color: ${(props) => props.theme.colors.text.infoMessage};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledTextInputWithIcon = styled(TextInput).attrs({
  selectionColor: "#D9D9D9",
  underlineColor: "transparent",
  activeUnderlineColor: "transparent",
  outlineColor: "transparent",
  activeOutlineColor: "transparent",
  placeHolderTextColor: "#676767",
  contentStyle: {
    paddingLeft: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: width * 0.03,
    paddingRight: 0,
  },
})`
  margin-top: ${width * 0.05}px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
  border-radius: 10px;
  height: ${containerHeight * 0.8}px;
  border-width: 1px;
  background-color: "transparent";
  ${({ isValid, value }) =>
    isValid
      ? `
  border-color: #27AE60;
`
      : value === null || value === undefined || value === ""
      ? `
      border-color: #D9D9D9;
      `
      : `
border-color: #DE1621;
`}
`;

const StyledTextInput = styled(TextInput).attrs({
  selectionColor: "#D9D9D9",
  underlineColor: "transparent",
  activeUnderlineColor: "transparent",
  outlineColor: "transparent",
  activeOutlineColor: "transparent",
  placeHolderTextColor: "#676767",
  contentStyle: {
    paddingLeft: width * 0.03,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: width * 0.03,
    paddingRight: 0,
  },
})`
  margin-top: ${width * 0.05}px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
  border-radius: 10px;
  height: ${containerHeight * 0.8}px;
  border-width: 1px;
  background-color: "transparent";
  border-color: ${(props) => props.theme.colors.border.primary};
`;

const TextInputIcon = styled(TextInput.Icon).attrs({
  iconColor: "red",
});

export const CustomTextInput = ({
  value,
  label,
  placeholder,
  keyboardType,
  msgToDisplay,
  onChange,
  isValid,
  maxLength,
  isUserNameTextInput,
}) => {
  return (
    <Container>
      <HeadingWrapperView>
        <MobileNumberText>{label}</MobileNumberText>
        {isUserNameTextInput === false && <Mandatory>*</Mandatory>}
      </HeadingWrapperView>
      {isUserNameTextInput === false ? (
        <StyledTextInputWithIcon
          isValid={isValid}
          mode="outlined"
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
          left={<TextInput.Icon icon={"phone"} iconColor="#666666" size={24} />}
        />
      ) : (
        <StyledTextInput
          mode="outlined"
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          maxLength={maxLength}
        />
      )}
      {isUserNameTextInput === false ? (
        <ErrorText>
          {value === null || value === undefined || value === "" || isValid
            ? null
            : msgToDisplay}
        </ErrorText>
      ) : null}
    </Container>
  );
};
