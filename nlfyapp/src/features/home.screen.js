import React from "react";
import { View } from "react-native";
import styled from "styled-components";
import { Devotional } from "./component/homeScreenComponent/devotional.component";
import { Sermon } from "./component/homeScreenComponent/sermon.component";
import { Event } from "./component/homeScreenComponent/event.component";
const WrapperView = styled(View)`
  top: 60px;
  position: absolute;
  width: 360px;
  height: 180px;
  border-radius: 10px;
`;

export const Home = () => {
  return (
    <WrapperView>
      <Devotional />
      <Sermon />
      <Event />
    </WrapperView>
  );
};
