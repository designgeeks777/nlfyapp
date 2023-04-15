import React from "react";
import { Text, Dimensions } from "react-native";
import styled from "styled-components";
import Pressable from "../../../components/pressable";

const { width, height } = Dimensions.get("window");
const buttonWidth = width * 0.3;

const PressableButton = styled(Pressable)`
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 32px;
  border-radius: 50px;
  margin-left: ${width * 0.038}px;
  top: ${width * 0.05}px;
  width: ${buttonWidth}px;
  height: ${height * 0.07}px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.bg.secondary};
  background-color: ${(props) => props.theme.colors.bgbutton.secondary};
  shadow-color: transparent;
`;

const ButtonText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.body};

  font-weight: ${(props) => props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.secondary};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const JoinButton = ({ label, handleClick }) => {
  return (
    <PressableButton activeOpacity={0.5} onPress={handleClick}>
      <ButtonText>{label}</ButtonText>
    </PressableButton>
  );
};
