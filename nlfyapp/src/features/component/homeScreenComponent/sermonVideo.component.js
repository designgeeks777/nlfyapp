import React, { useEffect, useState, useRef } from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { youtubeAPIKey } from "../../../../APIKey";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from "axios";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;
const containerheight = width * 0.5;
const containerTop = width * 0.1 + 5;
const channelId = "UCveuID2qdKDhzeJ_QM4JXqA";
const apiKey = youtubeAPIKey;
const maxResults = 2;
const videosUrl = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`;

const styles = StyleSheet.create({
  videoContainer: {
    width: containerWidth,
    height: containerheight,
    borderRadius: 30,
    justifyContent: "center",
   
  marginTop: containerTop,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  playButton: {
    alignSelf: "center",
    position: "absolute",
  },
  videoWrapper: {
    width: "100%",
    //height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
});

export const SermonVideo = () => {
  const [video, setVideo] = useState({});

  useEffect(() => {
    axios
      .get(videosUrl)
      .then((response) => {
        setVideo(response.data.items[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const playerRef = useRef(null);
  return (
    <View style={styles.videoContainer}>
      {video.id && (
        <View style={styles.videoWrapper}>
          <YoutubePlayer
            ref={playerRef}
            height={240}
            width={Dimensions.get("window").width - 20}
            videoId={video.id.videoId}
          />
        </View>
      )}
    </View>
  );
};
