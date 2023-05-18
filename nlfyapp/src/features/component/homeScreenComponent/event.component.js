import React from "react";
import { EventCardList } from "./eventCardList.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { Dimensions } from "react-native";

export const Event = () => {
  const { width } = Dimensions.get("window");
  const lefttop = width * (10 / 375);  // Assuming a reference width of 375
  const righttop = width * (10 / 375);  
  const marginleft = width * (90 / 375);  
  return (
    <>
      <HomeScreenHeading
        lefttext="What are we upto"
        righttext="See All Events"
        lefttop={`${lefttop}px`}
        righttop={`${righttop}px`}
        navigateTo="Events"
        marginleft={`${marginleft}px`}
      />
      <EventCardList />
    </>
  );
};
