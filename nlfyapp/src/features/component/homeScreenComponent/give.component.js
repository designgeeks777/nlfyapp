import React from "react";
import { View } from "react-native";
import { Button } from "../../../components/button";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import styled from "styled-components";

const ButtonView = styled(View)`
  padding-top: 0px;
  padding-bottom: 10px;
`;

export const Give = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Is God burdening you to Give?"
        lefttop="10px"
        righttop="0px"
        navigateTo="Give"
      />
      <ButtonView>
        <Button label="Give" />
      </ButtonView>
    </>
  );
};
