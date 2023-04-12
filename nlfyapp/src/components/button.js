import React from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import Pressable from "./pressable";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.9;
const PressableButton = styled(Pressable)`
  position: relative;
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 32px;
  border-radius: 50px;
  width: ${buttonWidth}px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.bgbutton.primary};
  bottom: 0px;
  left: 0px;
`;

const ButtonText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.button};
  line-height: ${(props) => props.theme.lineHeights.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]};
  color: ${(props) =>
    props.disabled
      ? props.theme.colors.text.disabled
      : props.theme.colors.text.inverse};
  font-family: ${(props) => props.theme.fonts.body};
  top: 18px;
`;

const StyledLinearGradient = styled(LinearGradient)`
  padding-horizontal: 32px;
  border-radius: 50px;
  width: ${buttonWidth}px;
  height: 56px;
  align-items: center;
`;

export const Button = ({ label, handleClick, disabled }) => {
  // console.log("BUTTON", disabled);
  return (
    <PressableButton
      activeOpacity={0.5}
      onPress={handleClick}
      disabled={disabled}
    >
      <StyledLinearGradient
        start={{ x: 180, y: 0.25 }}
        end={{ x: 180, y: 1.0 }}
        colors={["#E94A27", "#F26924"]}
      >
        <ButtonText disabled={disabled}>{label}</ButtonText>
      </StyledLinearGradient>
    </PressableButton>
  );
};
