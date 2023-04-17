import React, { useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";

// export const CustomTextInput = ({ value, label, placeholder, type, onChange }) => {
//   const handleChange = (e) => {
//     const { value } = e;
//     onChange(value);
//   };
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
  top: 8px;
  color: ${(props) => props.theme.colors.text.caption};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

const Mandatory = styled(Text)`
  top: 6px;
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
    paddingBottom: 10,
    paddingRight: 0,
  },
})`
  margin-top: 8px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
  border-radius: 10px;
  height: ${containerHeight}px;
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
    paddingLeft: 10,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 10,
    paddingRight: 0,
  },
})`
  margin-top: 8px;
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
  font-family: ${(props) => props.theme.fonts.body};
  border-radius: 10px;
  height: ${containerHeight}px;
  border-width: 1px;
  background-color: "transparent";
  border-color: ${(props) => props.theme.colors.border.primary};
`;

//       isUserNameTextInput
//         ?
//
// `;
//       border-color : #D9D9D9;`;
//       : isValid
//       ? `
//   border-color: #27AE60;
// `
//       : value === null || value === undefined || value === ""
//       ? `
//       border-color: #D9D9D9;
//       `
//       : `
// border-color: #DE1621;
// `};

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
  // console.log(
  //   "custom TEXTINPUT",
  //   isUserNameTextInput,
  //   isValid,
  //   value,
  //   msgToDisplay
  // );
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
          left={
            <TextInput.Icon
              // style={{ marginTop: 8 }}
              icon={"phone"}
              iconColor="#666666"
              size={24}
              // onPress={() => {
              //   setSecureTextEntry(!secureTextEntry);
              //   return false;
              // }}
            />
          }
        />
      ) : (
        <StyledTextInput
          // isValid={isValid}
          mode="outlined"
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
      )}
      {
        isUserNameTextInput === false ? (
          <ErrorText>
            {value === null || value === undefined || value === "" || isValid
              ? null
              : msgToDisplay}
            {/* {msgToDisplay} */}
          </ErrorText>
        ) : null
        // <MessageText>{msgToDisplay}</MessageText>
      }
    </Container>
  );
};
