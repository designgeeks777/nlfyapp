import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Text, Button } from "react-native-paper";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { BASEURL } from "../../../../APIKey";
import axios from "axios";
const { width, height } = Dimensions.get("window");
const cardWidth = width * 0.9;
const cardTop = height * 0.06;
const cardHeight = width * 0.5;
const padding = width * 0.02;

const DevotionalCard = styled(Card)`
  top: ${cardTop}px;
  width: ${cardWidth}px;
  height: ${cardHeight * 1.16}px;
  border-radius: ${width * 0.03}px;
`;

const CardTitle = styled(Text)`
  text-align: left;
  padding-top: ${cardTop * 0.1}px;
  padding-left: ${cardWidth * 0.04}px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const CardContent = styled(Text)`
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
  top: ${cardTop * 0.2}px;
`;

const CardReadmore = styled(Text)`
  padding-top: 14px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

const StyledLinearGradient = styled(LinearGradient)`
  border-radius: ${width * 0.03}px;
  width: ${cardWidth}px;
  height: ${cardHeight * 1.17}px;
  padding: ${padding}px;
`;

export const HomePageDevotionalCard = ({ devotional = {} }) => {
  const [data, setData] = useState([]);
  const url = `${BASEURL}devotionals/`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        let size = 0;
        if (response.data) {
          size = response.data.length;
          setData(response.data[size - 1]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  const navigation = useNavigation();
  const goToDevotionalsScreen = () => {
    navigation.navigate("Devotionals");
  };
  return (
    <DevotionalCard>
      <StyledLinearGradient
        start={{ x: 180, y: 0.25 }}
        end={{ x: 180, y: 1.0 }}
        colors={
          (["#D03925", "rgba(242, 36, 36, 1)"],
          ["#D03925", "rgba(242, 90, 36, 1)"])
        }
      >
        {data && (
          <>
            <CardTitle>{data.subject}</CardTitle>
            <Card.Content>
              <CardContent variant="bodyMedium" numberOfLines={5}>
                {data.content}
              </CardContent>
            </Card.Content>
          </>
        )}
        <Card.Actions>
          <CardReadmore onPress={goToDevotionalsScreen}>
            Read More...
          </CardReadmore>
        </Card.Actions>
      </StyledLinearGradient>
    </DevotionalCard>
  );
};
