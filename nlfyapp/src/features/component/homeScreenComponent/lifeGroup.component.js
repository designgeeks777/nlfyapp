import { React, useState } from "react";
import { View, Alert } from "react-native";
//import { Alert } from "react-native-paper";
import styled from "styled-components";
import { SecondaryButton } from "../../../components/secondaryButton.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { LifeGroupCardList } from "./lifeGroupCardList.component";
import { useNavigation } from "@react-navigation/native";

const ButtonView = styled(View)`
  padding-top: 30px;
`;

export const LifeGroup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // assuming default is not logged in
  const navigation = useNavigation();
  const handleJoinButtonClick = () => {
    if (!isLoggedIn) {
      Alert.alert("Please login/signup to join a lifegroup");
    } else {
      // navigate to a specific screen
      console.log("Navigate");

      navigation.navigate("Life Groups");
    }
  };
  return (
    <>
      <HomeScreenHeading
        lefttext="Life Groups"
        righttext="See All Life Groups"
        lefttop="50px"
        righttop="30px"
        navigateTo="Life Groups"
      />
      <LifeGroupCardList />
      <ButtonView>
        <SecondaryButton
          label="Join A Life Group"
          handleClick={handleJoinButtonClick}
        />
      </ButtonView>
    </>
  );
};
