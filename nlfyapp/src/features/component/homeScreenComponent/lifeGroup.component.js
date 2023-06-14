import { React, useState, useContext } from "react";
import { View, Alert } from "react-native";
import styled from "styled-components";
import { SecondaryButton } from "../../../components/secondaryButton.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { LifeGroupCardList } from "./lifeGroupCardList.component";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ButtonView = styled(View)`
  // padding-top: 0px;
`;

export const LifeGroup = () => {

  const { width } = Dimensions.get("window");
  const lefttop = width * (20 / 375);  // Assuming a reference width of 375
  const righttop = width * (20 / 375);  
  const marginleft = width * (105 / 375);  

  const { user } = useContext(AuthenticationContext);
  console.log("User in LG", user);
  console.log(null === user);
  // assuming default is not logged in
  const navigation = useNavigation();
  const handleJoinButtonClick = () => {
    if (null === user) {
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
        lefttop={`${lefttop}px`}
        righttop={`${righttop}px`}
        marginleft={`${marginleft}px`}
        navigateTo="Life Groups"
        user={user}
        conditionalNavigation={true}
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
