import React from "react";
import { View, Text, Image, Dimensions, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/button";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import { SecondaryButton } from "../components/secondaryButton.component";

const { width } = Dimensions.get("window");
const imageWidth = width * 1;
const { height } = Dimensions.get("window");
const imageheight = height * 0.6;
const textheight = height * 0.5;

const WrapperView = styled(View)`
  flex: 1;

  align-items: center;
`;

const YouAreThereImage = styled(ImageBackground)`
  height: ${imageheight}px;
  width: ${imageWidth}px;
  align-self: center;
`;

const GoogleButtonPadding = styled(View)`
  top: 10px;
`;
const PrimaryButtonPadding = styled(View)`
  top: 110px;
`;

const BoldText = styled(Text)`
  align-items: center;
  top: ${textheight}px;
  padding-left: 40px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Layer = styled(View)`
  background-color: rgba(242, 105, 36, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const Login = () => {
  const navigation = useNavigation();
  const navigateToLoginSecondScreen = () => {
    console.log("Navigation to Second Screen triggered");
    navigation.navigate("LoginSecondScreen");
  };
  return (
    <SafeAreaView>
      <WrapperView>
        <YouAreThereImage source={require("nlfyapp/assets/AlmostThere.jpg")}>
          <Layer>
            <BoldText>Great,You are almost there</BoldText>
          </Layer>
        </YouAreThereImage>

        <SecondaryButton label="Continue with Facebook" />
        <GoogleButtonPadding>
          <SecondaryButton label="Continue with Google" />
        </GoogleButtonPadding>
        <PrimaryButtonPadding>
          <Button
            label="Log in with Mobile"
            handleClick={navigateToLoginSecondScreen}
          />
        </PrimaryButtonPadding>
      </WrapperView>
    </SafeAreaView>
  );
};
