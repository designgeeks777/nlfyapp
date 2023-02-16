import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

export const HomeScreenHeading = ({
  lefttext,
  righttext,
  lefttop,
  righttop,
  navigateTo,
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

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(navigateTo);
  };
  return (
    <>
      <LeftSideText>{lefttext}</LeftSideText>
      <TouchableOpacity onPress={handlePress}>
        <RightSideText>{righttext} </RightSideText>
      </TouchableOpacity>
    </>
  );
};
