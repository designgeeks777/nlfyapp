import React from "react";
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Card, Text } from "react-native-paper";

import styled from "styled-components";
import { Divider } from "../../../components/divider.component";

const { width, height } = Dimensions.get("window");

const ViewEventCard = styled(View)`
  padding: ${width * 0.05}px;
`;

const MonthHeading = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledLinearGradient = styled(LinearGradient)`
  height: ${height * 0.1}px;
  border-radius: 15px;
  justify-content: center;

  width: ${width * 0.2}px;
`;

const EventCard = styled(Card)`
  shadow-color: transparent;
  border-color: transparent;
  background-color: "transparent";
  height: ${height * 0.3}px;
  border-radius: 15px;
  margin-bottom: -${width * 0.3}px;
  top: ${height * 0.02}px;
  width: ${width * 0.2}px;
`;

const DividerPadding = styled(Card)`
  margin-bottom: ${height * 0.02}px;
`;

const EventCardContent = styled(Text)`
  padding: 2px;
  text-align-vertical: center;
  text-align: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const CardWrapperView = styled(View)`
  flex-direction: row;
`;

const Content = styled(View)`
  top: ${height * 0.03}px;
  padding-left: 14px;
`;

const EventHeading = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const EventTiming = styled(Text)`
  padding-top: 2px;
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom: 2px;
`;

const EventLocation = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const EventDateCard = () => {
  return (
    <>
      <ScrollView contentContainerStyle={{ minHeight: height }}>
        <ViewEventCard>
          <MonthHeading>January, 2023</MonthHeading>
          <CardWrapperView>
            <EventCard>
              <StyledLinearGradient
                start={{ x: 180, y: 0.25 }}
                end={{ x: 180, y: 1.0 }}
                colors={["#E94A27", "#F26924"]}
              >
                <EventCardContent adjustsFontSizeToFit numberOfLines={2}>
                  JAN
                </EventCardContent>
                <EventCardContent adjustsFontSizeToFit numberOfLines={2}>
                  25
                </EventCardContent>
              </StyledLinearGradient>
            </EventCard>
            <Content>
              <EventHeading>Bible Study</EventHeading>
              <EventTiming>7: 30 PM to 9:30 PM, Every Wednesday</EventTiming>
              <EventLocation>In Zoom</EventLocation>
            </Content>
          </CardWrapperView>

          <Divider />
          <DividerPadding />

          <CardWrapperView>
            <EventCard>
              <StyledLinearGradient
                start={{ x: 180, y: 0.25 }}
                end={{ x: 180, y: 1.0 }}
                colors={["#E94A27", "#F26924"]}
              >
                <EventCardContent adjustsFontSizeToFit numberOfLines={2}>
                  JAN
                </EventCardContent>
                <EventCardContent adjustsFontSizeToFit numberOfLines={2}>
                  25
                </EventCardContent>
              </StyledLinearGradient>
            </EventCard>
            <Content>
              <EventHeading>Bible Study</EventHeading>
              <EventTiming>7: 30 PM to 9:30 PM, Every Wednesday</EventTiming>
              <EventLocation>In Zoom</EventLocation>
            </Content>
          </CardWrapperView>

          <Divider />
          <DividerPadding />
        </ViewEventCard>
      </ScrollView>
    </>
  );
};
