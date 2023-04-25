import React from "react";
import { View } from "react-native";
import { Button } from "../../../components/button";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import styled from "styled-components";

const ButtonView = styled(View)`
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
        marginleft="0px"
      />
      <ButtonView>
        <Button label="Give" />
      </ButtonView>
    </>
  );
};
