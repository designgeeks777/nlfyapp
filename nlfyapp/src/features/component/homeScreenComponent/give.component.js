import React from "react";
import { View } from "react-native";
import { Button } from "../../../components/button";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import styled from "styled-components";

const ButtonView = styled(View)`
  padding-top: 80px;
  padding-bottom: 25px;
`;

export const Give = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Is God burdening you to Give?"
        lefttop="140px"
        righttop="50px"
        navigateTo="Give"
      />
      <ButtonView>
        <Button label="Give" />
      </ButtonView>
    </>
  );
};
