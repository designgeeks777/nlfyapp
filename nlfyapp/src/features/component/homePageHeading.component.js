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
export const HomePageHeading = () => {
    return (
        <>
            <Profile>
                <Ionicons name="person-circle-sharp" size={45} color="rgba(242, 105, 36, 0.6)" />
            </Profile>
            <WelcomeText>Welcome</WelcomeText>
        </>
    );
};

