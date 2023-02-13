/* eslint-disable prettier/prettier */
import React from "react";
import { Text } from "react-native";
import styled from "styled-components";


const LeftSideText = styled(Text)`
  position: absolute;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const RightSideText = styled(Text)`
  position: absolute;
  color: ${(props) => props.theme.colors.text.seeall};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  align-self: flex-end;
`;

export const HomeScreenHeading = ({ lefttext, righttext, styletop }) => {
  return (
    <>
      <LeftSideText>{lefttext}</LeftSideText>
      <RightSideText>{righttext} </RightSideText>
    </>
  );
};
