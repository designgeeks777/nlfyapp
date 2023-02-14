import React from "react";
import { Text } from "react-native";
import styled from "styled-components";

export const HomeScreenHeading = ({
  lefttext,
  righttext,
  lefttop,
  righttop,
}) => {
  const LeftSideText = styled(Text)`
    top: ${lefttop};
    color: ${(props) => props.theme.colors.text.primary};
    margin-left: 8px;
    font-size: ${(props) => props.theme.fontSizes.bodylarge};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-family: ${(props) => props.theme.fonts.body};
  `;
  const RightSideText = styled(Text)`
    top: ${righttop};
    margin-right: 8px;
    color: ${(props) => props.theme.colors.text.seeall};
    font-size: ${(props) => props.theme.fontSizes.caption};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-family: ${(props) => props.theme.fonts.body};
    align-self: flex-end;
  `;
  return (
    <>
      <LeftSideText>{lefttext}</LeftSideText>
      <RightSideText>{righttext} </RightSideText>
    </>
  );
};
