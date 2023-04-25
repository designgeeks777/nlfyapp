import React from "react";
import { SermonVideo } from "./sermonVideo.component";
import { HomeScreenHeading } from "../homeScreenHeading.component";

export const Sermon = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Latest Sermon"
        righttext="See All Sermons "
        lefttop="50px"
        righttop="50px"
        navigateTo="Sermons"
        marginleft="120px"
      />
      <SermonVideo />
    </>
  );
};
