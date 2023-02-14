/* eslint-disable prettier/prettier */
import React from "react";
import { EventCardList } from "./eventCardList.component";
import { HomeScreenHeading } from "../homeScreenHeader.component";
export const Event = () => {
    return (
        <>
            <HomeScreenHeading lefttext="What are we upto" righttext="See All Events for this year..." />
            <EventCardList />
        </>
    );
};
