import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

const WelcomeText = styled(Text)`
  position: absolute;
  top: 10px;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;
const Profile = styled(View)`
  align-self: flex-end;
`;
export const Welcome = () => {
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
    </>
  );
};
