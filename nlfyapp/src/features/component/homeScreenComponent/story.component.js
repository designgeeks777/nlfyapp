import { React } from "react";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { StoryCardList } from "./storyCardList.component";

export const Story = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Our Stories"
        righttext="See All Stories"
        lefttop="70px"
        righttop="50px"
        navigateTo="Stories"
      />
      <StoryCardList />
    </>
  );
};
