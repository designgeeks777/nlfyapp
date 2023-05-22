import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../../components/button";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import styled from "styled-components";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const ButtonView = styled(View)`
  padding-bottom: ${width * 0.02}px; 
  padding-top: ${width * 0.05}px; 
`;

export const Give = () => {
  const navigation = useNavigation();
  const lefttop = width * (25 / 375); // Adjust the value as needed

  const handleClick = () => {
    navigation.navigate("Give"); // Navigate to the "Give" screen
  };

  return (
    <>
      <HomeScreenHeading
        lefttext="Is God burdening you to Give?"
        lefttop={`${lefttop}px`}
        righttop="0px"
        navigateTo="Give"
        marginleft="0px"
      />
      <ButtonView>
        <Button label="Give" handleClick={handleClick} />
      </ButtonView>
    </>
  );
};
