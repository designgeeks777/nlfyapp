import React from "react";
import { SermonVideo } from "./sermonVideo.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { Dimensions } from "react-native";

export const Sermon = () => {
  const { width } = Dimensions.get("window");
  const lefttop = width * (75 / 375);  // Assuming a reference width of 375
  const righttop = width * (75 / 375);  
  const marginleft = width * (100 / 375);  

  return (
    <>
      <HomeScreenHeading
        lefttext="Latest Sermon"
        righttext="See All Sermons"
        lefttop={`${lefttop}px`}
        righttop={`${righttop}px`}
        navigateTo="Sermons"
        marginleft={`${marginleft}px`}
      />
      <SermonVideo />
    </>
  );
};
