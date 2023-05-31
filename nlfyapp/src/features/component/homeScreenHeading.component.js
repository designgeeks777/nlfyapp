import React from "react";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const margin = width;

export const HomeScreenHeading = ({
  lefttext,
  righttext,
  lefttop,
  righttop,
  marginleft,
  navigateTo,
  user,
  conditionalNavigation,
}) => {
  const LeftSideText = styled(Text)`
    top: ${lefttop};
    color: ${(props) => props.theme.colors.text.primary};
    margin-left: ${margin * 0.01}px;
    font-size: ${(props) => props.theme.fontSizes.bodylarge};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-family: ${(props) => props.theme.fonts.body};
    margin-bottom:${margin * 0.01}px;
  `;
  const RightSideText = styled(Text)`
    color: ${(props) => props.theme.colors.text.seeall};
    font-size: ${(props) => props.theme.fontSizes.caption};
    font-weight: ${(props) => props.theme.fontWeights.bold};
    font-family: ${(props) => props.theme.fonts.body};
  `;

  const Touchable = styled(TouchableOpacity)`
    margin-top: ${righttop};
    align-self: flex-end;
    margin-left: ${marginleft};
    margin-bottom:${margin * 0.02}px;
    z-index: 999;
  `;

  const HeadingWrapper = styled(View)`
    flex-direction: row;
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
    <HeadingWrapper>
      <LeftSideText>{lefttext}</LeftSideText>
      <Touchable onPress={handlePress} activeOpacity={0.6}>
        <RightSideText>{righttext}</RightSideText>
      </Touchable>
    </HeadingWrapper>
  );
};
