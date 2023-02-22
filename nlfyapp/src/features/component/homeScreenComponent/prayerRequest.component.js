import React from "react";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { PrayerRequestChat } from "./prayerRequestChat.component";

export const PrayerRequest = () => {
  return (
    <>
      <HomeScreenHeading
        lefttext="Prayer Requests"
        righttext="See All Requests"
        lefttop="90px"
        righttop="70px"
        navigateTo="Prayer Request"
      />
      <PrayerRequestChat />
    </>
  );
};
