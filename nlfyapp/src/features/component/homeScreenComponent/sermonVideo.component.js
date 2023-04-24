import React, { useEffect, useState, useRef } from "react";
import { Image, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { youtubeAPIKey } from "../../../../APIKey";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from "axios";

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;

const channelId = "UCveuID2qdKDhzeJ_QM4JXqA";
const apiKey = youtubeAPIKey;
const maxResults = 2;
const videosUrl = `https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=${channelId}&maxResults=${maxResults}&key=${apiKey}`;

const styles = StyleSheet.create({
  videoContainer: {
    top: 40,
    width: containerWidth,
    height: 200,
    //borderRadius: 30,
    justifyContent: "center",
    //alignItems: "center",
    //padding: 10,
    marginTop: 24,
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
        //console.log("response sermon", response.data.items[0]);
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
