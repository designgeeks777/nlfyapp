import React from "react";
import { Text, Pressable } from "react-native";
import styled from "styled-components";

const PressableButton = styled(Pressable)`
  align-items: center;
  padding-vertical: 16px;
  padding-horizontal: 32px;
  border-radius: 50px;
  top: 50px;
  width: 320px;
  height: 56px;
  background-color: ${(props) => props.theme.colors.bgbutton.primary};
`;

const ButtonText = styled(Text)`
  text-align: center;
  font-size: ${(props) => props.theme.fontSizes.button};
  line-height: ${(props) => props.theme.lineHeights.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  letter-spacing: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.text.inverse};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const Button = ({ label, handleClick }) => {
  return (
    <PressableButton elevation={3}>
      <ButtonText>{label}</ButtonText>
    </PressableButton>
  );
};
