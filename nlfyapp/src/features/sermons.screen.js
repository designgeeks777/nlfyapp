import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Button } from "../components/button";
import YoutubePlayer from "react-native-youtube-iframe";
import styled from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { Searchbar } from "react-native-paper";

import axios from "axios";

import { youtubeAPIKey } from "../../APIKey";

const channelId = "UCveuID2qdKDhzeJ_QM4JXqA";
const apiKey = youtubeAPIKey;
const maxResults = 10; // the maximum number of results to retrieve

const videosUrl = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`;

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  top: 20px;
  margin-left: 10px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  justify-content: flex-start;
`;

const TitleText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  bottom: 8px;
`;

const ViewSearchbar = styled(View)`
  padding: 10px;
`;

const VideoItem = ({ video, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 10 }}>
      <TitleText>{video.snippet.title}</TitleText>
      <View style={{ flex: 1 }}>
        <YoutubePlayer
          height={240}
          width={Dimensions.get("window").width - 20}
          videoId={video.id.videoId}
        />
      </View>
    </View>
  </TouchableOpacity>
);

const SearchBar = styled(Searchbar)`
  margin-horizontal: 10px;
  margin-vertical: 10px;
  elevation: 0;
  border-radius: 10px;
  top: 10px;

  ${({ isFocused }) =>
    isFocused &&
    `
    border-width: 1px;
    border-color: orange;
  `}
`;

export const Sermons = () => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  useEffect(() => {
    axios
      .get(videosUrl)
      .then((response) => {
        setVideos(response.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderVideoItem = ({ item }) => <VideoItem video={item} />;

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredVideos = videos.filter((video) => {
    return video.snippet.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <SafeAreaViewWrapper>
        <WrapperView>
          <BackButton text="Sermons" />
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
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id.videoId}
          renderItem={renderVideoItem}
          style={{ marginTop: 10 }}
        />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
