import { React } from "react";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { StoryCardList } from "./storyCardList.component";
import { Dimensions } from "react-native";

export const Story = () => {
  const { width } = Dimensions.get("window");
  const lefttop = width * (40 / 375);  // Assuming a reference width of 375
  const righttop = width * (40 / 375);  
  const marginleft = width * (135 / 375);  

  return (
    <>
      <HomeScreenHeading
        lefttext="Our Stories"
        righttext="See All Stories"
        lefttop={`${lefttop}px`}
        righttop={`${righttop}px`}
        navigateTo="Stories"
        marginleft={`${marginleft}px`}
      />
      <StoryCardList />
    </>
  );
};
