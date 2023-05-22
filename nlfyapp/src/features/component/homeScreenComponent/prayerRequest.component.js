import React from "react";
import { HomeScreenHeading } from "../homeScreenHeading.component";
import { PrayerRequestChat } from "./prayerRequestChat.component";
import { Dimensions } from "react-native";

export const PrayerRequest = () => {
  const { width } = Dimensions.get("window");
  const lefttop = width * (2/ 375);  // Assuming a reference width of 375
  const righttop = width * (2 / 375);  
  const marginleft = width * (80 / 375);  
  
  return (
    <>
      <HomeScreenHeading
        lefttext="Prayer Requests"
        righttext="See All Requests"
        lefttop={`${lefttop}px`}
        righttop={`${righttop}px`}
        navigateTo="Prayer Request"
        marginleft={`${marginleft}px`}
      />
      <PrayerRequestChat />
    </>
  );
};
