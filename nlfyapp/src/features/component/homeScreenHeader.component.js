/* eslint-disable prettier/prettier */
import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const WelcomeText = styled(Text)`
  position: absolute;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Profile = styled(View)`
  align-self: flex-end;
`;

const LeftSideEventText = styled(Text)`
  position: absolute;
  top: 540px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const RightSideEventSeeAll = styled(Text)`
  position: absolute;
  top: 545px;
  color: ${(props) => props.theme.colors.text.seeall};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  align-self: flex-end;
`;
const LeftSideSermonText = styled(Text)`
  position: absolute;
  top: 290px;
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const RightSideSermonSeeAll = styled(Text)`
  position: absolute;
  top: 295px;
  color: ${(props) => props.theme.colors.text.seeall};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  align-self: flex-end;
`;
export const HomeScreenHeading = () => {
    return (
        <>
            <Profile>
                <Ionicons
                    name="person-circle-sharp"
                    size={45}
                    color="rgba(242, 105, 36, 0.6)"
                />
            </Profile>
            <WelcomeText>Welcome</WelcomeText>
            <LeftSideSermonText>Latest Sermon</LeftSideSermonText>
            <RightSideSermonSeeAll>See All... </RightSideSermonSeeAll>
            <LeftSideEventText>What are we upto</LeftSideEventText>
            <RightSideEventSeeAll> See All Events for this year...</RightSideEventSeeAll>
        </>
    );
};
