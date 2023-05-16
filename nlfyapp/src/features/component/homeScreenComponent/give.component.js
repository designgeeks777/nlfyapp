import React from "react";
import { Alert, View } from "react-native";
import { Button } from "../../../components/button";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import styled from "styled-components";

const ButtonView = styled(View)`
  padding-bottom: 10px;
`;

export const Give = () => {
  const handleClick = () => {
    Alert.alert(
      "We are working on this.You will be able to give your offerings soon"
    );
  };
  return (
    <>
      <HomeScreenHeading
        lefttext="Is God burdening you to Give?"
        lefttop="10px"
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
