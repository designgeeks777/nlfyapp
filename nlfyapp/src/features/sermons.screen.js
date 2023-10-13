import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "../components/button";
import YoutubePlayer from "react-native-youtube-iframe";
import styled from "styled-components/native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { BackButton } from "../components/backButton";
import { Searchbar } from "react-native-paper";

import { youtubeChannelID } from "../../APIKey";

import axios from "axios";

import { youtubeAPIKey } from "../../APIKey";

const channelId = youtubeChannelID;
const apiKey = youtubeAPIKey;
const maxResults = 10; // the maximum number of results to retrieve

const videosUrl = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`;

const { width } = Dimensions.get("window");
const wrapperWidth = width * 0.9;
const padding = width * 0.1;
const top = width * 0.05;
const marginLeft = width * 0.05;

const WrapperView = styled(View)`
  width: ${wrapperWidth}px;
  border-radius: 10px;
  padding-bottom: ${padding}px; 
  top: ${top}px; 
  margin-left:${marginLeft}px;
`;

const SafeAreaViewWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: flex-start;
`;

const TitleText = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.bodylarge};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  bottom: 8px;
`;

const VideoItem = ({ video, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 15 }}>
      <TitleText>{video.snippet.title}</TitleText>
      <View style={{ flex: 1 }}>
        <YoutubePlayer
          height={210}
          width={Dimensions.get("window").width - 30}
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
  // top: -20px;

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
       
         <SearchBar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            isFocused={isSearchBarFocused}
            onFocus={() => setIsSearchBarFocused(true)}
            onBlur={() => setIsSearchBarFocused(false)}
            placeholderTextColor="gray"
          />

        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id.videoId}
          renderItem={renderVideoItem}
          style={{ marginTop: 5 }}
          accessibilityLabel="List of Sermon Videos"
        />
      </SafeAreaViewWrapper>
      <ExpoStatusBar style="auto" />
    </>
  );
};
