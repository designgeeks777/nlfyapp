import React, { useEffect, useState, useRef } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import axios from "axios";
import { youtubeAPIKey } from "../../../../APIKey";
import { youtubeChannelID } from "../../../../APIKey";
import { HomeScreenHeading } from "../homeScreenHeading.component";

import YoutubePlayer from "react-native-youtube-iframe";

const API_KEY = youtubeAPIKey;
const CHANNEL_ID = youtubeChannelID;
const pollingInterval = 60000; // Interval in milliseconds (e.g., 1 minute)

const { width } = Dimensions.get("window");
const containerWidth = width * 0.9;
const containerheight = width * 0.5;
const containerTop = width * 0.1 + 5;

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

export const LiveStream = () => {
  const [videoresult, setVideoresult] = useState(null);

  useEffect(() => {
      const now = new Date();
      const day = now.getDay(); // Sunday is represented by 0 (Sunday-Saturday: 0-6)
      const hour = now.getHours();

      console.log("Day", day);
      console.log("Hour", hour);

      // Check if it's Sunday and the time is within 8 AM to 12 Noon
      if (day === 0 && hour >= 8 && hour < 13) {
        axios
          .get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`
          )
          .then((response) => {
            const videos = response.data.items;
            const livestreamVideos = videos.filter(
              (video) => video.snippet.liveBroadcastContent === "live"
            );

            if (livestreamVideos.length > 0) {
              const livestreamVideo = livestreamVideos[0];
              console.log("LiveStreamVideo", livestreamVideo);
              setVideoresult(livestreamVideo);
            } else {
              setVideoresult(null);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setVideoresult(null); // Reset video result if it's not Sunday or outside the time range
      }
  }, []);

  const playerRef = useRef(null);

  return (
    videoresult && (
      <View style={styles.videoContainer}>
        <View style={styles.videoWrapper}>
          <YoutubePlayer
            ref={playerRef}
            height={240}
            width={Dimensions.get("window").width - 20}
            videoId={videoresult.id.videoId}
          />
        </View>
      </View>
    )
  );
};
