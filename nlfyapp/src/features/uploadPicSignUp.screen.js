import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { Button } from "../components/button";

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.5;
const imageHeight = height * 0.4;

const ContainerView = styled(View)`
  margin: 32px;
`;

const Heading = styled(Text)`
  color: ${(props) => props.theme.colors.text.title};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  margin-top: 28px;
`;

const Caption = styled(Text)`
  color: ${(props) => props.theme.colors.text.caption};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  line-height: ${(props) => props.theme.lineHeights.button};
  letter-spacing: ${(props) => props.theme.space[1]};
  margin-top: 24px;
  align-items: center;
`;

const ProfilePicContainer = styled(SafeAreaView)`
  margin-top: 18px;
  margin-bottom: 36px;
  height: ${imageHeight}px;
  width: ${imageWidth}px;
  border-radius: 200px;
  align-self: center;
  justify-content: center;
`;

const OptionsContainer = styled(View)`
  align-items: center;
`;

const ProfilePic = styled(Image)`
  height: 220px;
  width: 228px;
  border-radius: 200px;
  align-self: center;
`;

const SkipForNow = styled(Text)`
  top: 24px;
  color: ${(props) => props.theme.colors.text.title};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
`;

export const UploadPicSignUp = (props) => {
  const navigation = useNavigation();
  const onSubmitUser = () => {
    navigation.navigate("Home", {
      userName: props.route.params.userName,
    });
  };

  const maleDefaultProfilePic = require("nlfyapp/assets/upload-pic-sign-up-male.png");
  const femaleDefaultProfilePic = require("nlfyapp/assets/profile2.jpg");
  let icon =
    props.route.params.gender === "male"
      ? maleDefaultProfilePic
      : femaleDefaultProfilePic;
  return (
    <ContainerView>
      <Heading>One last step</Heading>
      <Caption>
        Having a face to your profile can give you an entire different
        experience.
      </Caption>
      <ProfilePicContainer>
        <ProfilePic source={icon} />
      </ProfilePicContainer>
      <OptionsContainer>
        <Button label="Upload Profile Pic" handleClick={onSubmitUser} />
        <SkipForNow onPress={onSubmitUser}>Skip for now</SkipForNow>
      </OptionsContainer>
    </ContainerView>
  );
};
