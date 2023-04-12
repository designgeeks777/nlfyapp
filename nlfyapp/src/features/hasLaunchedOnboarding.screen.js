import React, { useLayoutEffect } from "react";
import {
  Text,
  Image,
  View,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import styled from "styled-components/native";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const slide2ImageWidth = width * 0.5;
const slide2ImageHeight = height * 0.3;

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

const Slide2 = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextScreen2 = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  margin-left: ${(props) => props.theme.space[3]};
  margin-right: ${(props) => props.theme.space[3]};
  margin-top: 24px;
`;

const TextScreen2Orange = styled(Text)`
  top: 20px;
  margin-bottom: 30px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const TextScreen1Orange = styled(Text)`
  top: 160px;
  padding-top: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Slide2ImageConatinerView = styled(View)`
  height: ${slide2ImageHeight}px;
  width: ${slide2ImageWidth}px;
  border-radius: 10px;
  top: 0px;
  margin-bottom: 32px;
`;
const Slide2Image = styled(Image)`
  height: 100%;
  width: 100%;
`;

export const HasLaunchedOnboarding = ({ route }) => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    if (!navigation || !route) return;
    const mainBottomTabNavigator = navigation.getParent("MainBottomTab");
    if (mainBottomTabNavigator) {
      mainBottomTabNavigator.setOptions({
        tabBarStyle: { display: "none" },
      });
    }
    return mainBottomTabNavigator
      ? () => {
          mainBottomTabNavigator.setOptions({
            tabBarStyle: { display: "flex" },
          });
        }
      : undefined;
  }, [navigation, route]);

  const navigateToSignUp = () => {
    console.log("NavigateToSignUp");
    navigation.navigate("SignUp");
  };
  const navigateToLogin = () => {
    console.log("NavigateToLogin");
    navigation.navigate("Login");
  };
  return (
    <SafeArea>
      <Slide2>
        <Slide2ImageConatinerView>
          <Slide2Image source={require("nlfyapp/assets/onboarding2.png")} />
        </Slide2ImageConatinerView>
        <TextScreen2>
          Easily join this spiritual family which is not just a Sunday church
          but cares about you..
        </TextScreen2>

        <TextScreen2Orange>
          Sign Up to have a customized experience or swipe
        </TextScreen2Orange>
        <Button label="Sign Up" handleClick={navigateToSignUp} />
        <TextScreen2>
          Already a member?
          <TextScreen1Orange onPress={navigateToLogin}>
            {" "}
            Log in
          </TextScreen1Orange>
        </TextScreen2>
      </Slide2>
    </SafeArea>
  );
};
