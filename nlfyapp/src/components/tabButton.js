import React from "react";
import { Text, Dimensions, View } from "react-native";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import Pressable from "./pressable";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.4;
const PressableButton = styled(Pressable)`
  align-items: center;
  padding-vertical: 14px;

  border-radius: 50px;
  width: ${buttonWidth}px;
  height: 50px;
  border-color: orange;
  border-style: solid;
  border-width: 1px;
`;

const ButtonText = styled(Text)`
  text-align: center;
  font-size: 12px;
  line-height: ${(props) => props.theme.lineHeights.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]};
  color: black;
  font-family: ${(props) => props.theme.fonts.body};
  top: -2px;
`;

export const TabButton = ({ label, handleClick }) => {
  return (
    <PressableButton onPress={handleClick}>
      <ButtonText>{label}</ButtonText>
    </PressableButton>
  );
};
