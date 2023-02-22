import { React } from "react";
import { View } from "react-native";
import styled from "styled-components";
import { SecondaryButton } from "../../../components/secondaryButton.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { LifeGroupCardList } from "./lifeGroupCardList.component";

const ButtonView = styled(View)`
  padding-top: 30px;
`;

export const LifeGroup = () => {
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
        <SecondaryButton label="Join A Life Group" />
      </ButtonView>
    </>
  );
};
