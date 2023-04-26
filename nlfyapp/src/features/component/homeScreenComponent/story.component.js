import { React } from "react";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { StoryCardList } from "./storyCardList.component";

export const Story = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Our Stories"
        righttext="See All Stories"
        lefttop="40px"
        righttop="40px"
        navigateTo="Stories"
        marginleft="160px"
      />
      <StoryCardList />
    </>
  );
};
