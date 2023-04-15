import React from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

export const HomeScreenHeading = ({
  lefttext,
  righttext,
  lefttop,
  righttop,
  navigateTo,
  user,
  conditionalNavigation,
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
    color: ${(props) => props.theme.colors.text.seeall};
    font-size: ${(props) => props.theme.fontSizes.caption};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const Touchable = styled(TouchableOpacity)`
    top: ${righttop};
    margin-right: 8px;
    align-self: flex-end;
  `;

  const navigation = useNavigation();

  const handlePress = () => {
    if (conditionalNavigation) {
      if (user) {
        navigation.navigate(navigateTo);
      } else {
        Alert.alert("Please login/signup to see this");
      }
    } else {
      navigation.navigate(navigateTo);
    }
  };
  return (
    <>
      <LeftSideText>{lefttext}</LeftSideText>
      <Touchable onPress={handlePress}>
        <RightSideText>{righttext}</RightSideText>
      </Touchable>
    </>
  );
};
