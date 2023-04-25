import React from "react";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { PrayerRequestChat } from "./prayerRequestChat.component";

export const PrayerRequest = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Prayer Requests"
        righttext="See All Requests"
        lefttop="50px"
        righttop="50px"
        navigateTo="Prayer Request"
        marginleft="90px"
      />
      <PrayerRequestChat />
    </>
  );
};
