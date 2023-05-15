import React from "react";
import { Text, Dimensions, View } from "react-native";
import styled from "styled-components";
import Pressable from "./pressable";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.3;
const PressableButton = styled(Pressable)`
  align-items: center;
  padding-vertical: 16px;
  width: ${buttonWidth}px;
`;

const ButtonText = styled(Text)`
  text-align: center;
  font-size: 12px;
  line-height: ${(props) => props.theme.lineHeights.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]};
  color: "#000000";
  font-family: ${(props) => props.theme.fonts.body};
  top: -2px;
`;

export const TabButtonUnselected = ({ label, handleClick }) => {
  return (
    <PressableButton activeOpacity={0.5} onPress={handleClick}>
      <ButtonText>{label}</ButtonText>
    </PressableButton>
  );
};
