import React from "react";
import { SermonVideo } from "./sermonVideo.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";

export const Sermon = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Latest Sermon"
        righttext="See All"
        lefttop="50px"
        righttop="30px"
        navigateTo="Sermons"
      />
      <SermonVideo />
    </>
  );
};
