/* eslint-disable prettier/prettier */
import React from "react";
import { SermonVideo } from "./sermonVideo.component";
import { HomeScreenHeading } from "../homeScreenHeader.component";

export const Sermon = () => {
    return (
        <>
            <HomeScreenHeading lefttext="Latest Sermon" righttext="See All..." />
            <SermonVideo />
        </>
    );
};
