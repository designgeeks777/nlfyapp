/* eslint-disable react-native/no-inline-styles */
import React from "react";
import styled from "styled-components/native";
import { Card } from "react-native-paper";
import {
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Dimensions } from "react-native";
import { Button } from "../../../components/button";
// import { StatusBar as ExpoStatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.75;

const Container = styled(View)`
  margin-horizontal: 20px;
`;

const PrayerCard = styled(Card)`
  top: ${(props) => props.top}px;
  align-self: ${(props) => (props.isRight ? "flex-end" : "flex-start")};
  width: ${cardWidth}px;
  height: 80px;
  background-color: [ "#F26924", "rgba(242, 105, 36, 0.10)"];
  border-radius: 20px;
  shadow-color: transparent;
  justify-content: center;
`;

const PrayerText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

const ProfilePicture = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`;
const PrayerCardContent = styled(View)`
  flex-direction: ${(props) => (props.isRight ? "row" : "row-reverse")};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const NameText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  margin: 4px;
`;

const ButtonView = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const CommunityPrayers = () => {
  const PrayerContentRequest =
    "Keep praying for my job, this is the final week of my presentation.";
  const PrayerContentResponse = "Thanks for your prayers, I have been healed..";
  return (
    <>
      <ScrollView>
        <Container>
          <PrayerCard elevation={0} top={30} isRight={true}>
            <PrayerCardContent>
              <PrayerText variant="body">{PrayerContentRequest}</PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ top: -40 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile1.jpg")} />
            <NameText variant="caption">Robin</NameText>
          </View>

          <PrayerCard elevation={0} top={5} isRight={false}>
            <PrayerCardContent>
              <PrayerText variant="body">{PrayerContentResponse}</PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ marginLeft: 320, bottom: 70 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile2.jpg")} />
            <NameText variant="caption">Sandeep</NameText>
          </View>

          <PrayerCard elevation={0} top={-20} isRight={true}>
            <PrayerCardContent>
              <PrayerText variant="body">
                Please pray for my family's health.
              </PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ bottom: 90 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile1.jpg")} />
            <NameText variant="caption">Paul</NameText>
          </View>

          <PrayerCard elevation={0} top={-45} isRight={false}>
            <PrayerCardContent>
              <PrayerText variant="body">
                I need prayer for my family's health and safety.
              </PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ marginLeft: 320, bottom: 115 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile2.jpg")} />
            <NameText variant="caption">Jonah</NameText>
          </View>
          <PrayerCard elevation={0} top={-55} isRight={true}>
            <PrayerCardContent>
              <PrayerText variant="body">
                Please pray for my family's health.
              </PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ bottom: 125 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile1.jpg")} />
            <NameText variant="caption">Paul</NameText>
          </View>

          <PrayerCard elevation={0} top={-80} isRight={false}>
            <PrayerCardContent>
              <PrayerText variant="body">
                I need prayer for my family's health and safety.
              </PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ marginLeft: 320, bottom: 155 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile2.jpg")} />
            <NameText variant="caption">Jonah</NameText>
          </View>
          <PrayerCard elevation={0} top={-90} isRight={true}>
            <PrayerCardContent>
              <PrayerText variant="body">
                Please pray for my family's health.
              </PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ bottom: 160 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile1.jpg")} />
            <NameText variant="caption">Paul</NameText>
          </View>

          <PrayerCard elevation={0} top={-115} isRight={false}>
            <PrayerCardContent>
              <PrayerText variant="body">
                I need prayer for my family's health and safety.
              </PrayerText>
            </PrayerCardContent>
          </PrayerCard>
          <View style={{ marginLeft: 320, bottom: 195 }}>
            <ProfilePicture source={require("nlfyapp/assets/profile2.jpg")} />
            <NameText variant="caption">Jonah</NameText>
          </View>
        </Container>
      </ScrollView>
      <ButtonView>
        <Button label="Raise Prayer Request" />
      </ButtonView>
    </>
  );
};
