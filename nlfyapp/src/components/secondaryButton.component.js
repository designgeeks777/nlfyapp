import React from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components";
import Pressable from "./pressable";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.9;

const PressableButton = styled(Pressable)`
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 32px;
  border-radius: 50px;
  top: 50px;
  width: ${buttonWidth}px;
  height: 56px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.bg.secondary};
  background-color: ${(props) => props.theme.colors.bgbutton.secondary};
  shadow-color: transparent;
`;

const ButtonText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.button};
  line-height: ${(props) => props.theme.lineHeights.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.secondary};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const SecondaryButton = ({ label, handleClick }) => {
  return (
    <PressableButton activeOpacity={0.5} onPress={handleClick}>
      <ButtonText>{label}</ButtonText>
    </PressableButton>
  );
};
