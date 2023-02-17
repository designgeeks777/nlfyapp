import React from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components";
import { Devotional } from "./component/homeScreenComponent/devotional.component";
import { Sermon } from "./component/homeScreenComponent/sermon.component";
import { Event } from "./component/homeScreenComponent/event.component";
import { Give } from "./component/homeScreenComponent/give.component";
import { Story } from "./component/homeScreenComponent/story.component";
import { Welcome } from "./component/homeScreenComponent/welcome.component";

const WrapperView = styled(View)`
  top: 40px;
  width: 360px;
  border-radius: 10px;
  padding-bottom: 200px;
`;

export const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <WrapperView>
        <Welcome />
        <Devotional />
        <Sermon />
        <Event />
        <Give />
        <Story />
      </WrapperView>
    </ScrollView>
  );
};
