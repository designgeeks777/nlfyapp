import React from "react";
import { EventCardList } from "./eventCardList.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";
export const Event = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="What are we upto"
        righttext="See All Events"
        lefttop="70px"
        righttop="50px"
        navigateTo="Events"
      />
      <EventCardList />
    </>
  );
};
