import React, { useState } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
} from "react-native";

import styled from "styled-components";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";

import { Searchbar } from "react-native-paper";
import { EventDateCard } from "./component/event/eventDateCard.component";

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  padding-bottom: ${width * 0.05}px;
  top: ${width * 0.05}px;
  margin-left: 10px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
`;

const SearchBar = styled(Searchbar)`
  margin-horizontal: 10px;
  margin-vertical: 10px;
  elevation: 0;
  border-radius: 10px;

  ${({ isFocused }) =>
    isFocused &&
    `
    border-width: 1px;
    border-color: orange;
  `}
`;

const ViewSearchbar = styled(View)`
  padding: 10px;
`;
export const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <>
      <SafeAreaViewWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <WrapperView>
            <BackButton text="Events" />
          </WrapperView>
          <ViewSearchbar>
            <SearchBar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              isFocused={isSearchBarFocused}
              onFocus={() => setIsSearchBarFocused(true)}
              onBlur={() => setIsSearchBarFocused(false)}
              placeholderTextColor="gray"
            />
          </ViewSearchbar>
          <EventDateCard />
        </ScrollView>
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
