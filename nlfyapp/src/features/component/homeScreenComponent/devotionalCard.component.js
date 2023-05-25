import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { BASEURL } from "../../../../APIKey";
import axios from "axios";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;
const cardTop = width * 0.09;
const cardHeight = width * 0.5;
const padding = width * 0.02;

const DevotionalCard = styled(Card)`
  top:  ${cardTop}px;
  width: ${cardWidth}px;
  height: ${cardHeight * 1.16}px;
  border-radius: ${width * 0.03}px;
`;

const CardTitle = styled(Text)`
  padding-top: ${cardTop * 0.1}px; 
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
  width: ${cardWidth * 0.9}px;
  top: ${cardTop * 0.2}px;
`;

const CardReadmore = styled(Text)`
  align-self: flex-end;
  text-align: right;
  top: ${cardTop * 0.3}px;
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
        start={{ x: 180, y: 0.4 }}
        end={{ x: 180, y: 0.6 }}
        colors={
          (["#F22424", "rgba(242, 36, 36, 1)"],
          ["#F26924", "rgba(242, 105, 36, 0.80)"])
        }
      >
        <Card.Content>
          {data && (
            <>
              <CardTitle variant="titleLarge">{data.subject}</CardTitle>
              <CardContent numberOfLines={5} variant="bodyMedium">
                {data.content}
              </CardContent>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          <CardReadmore variant="bodyMedium" onPress={goToDevotionalsScreen}>
            Read More...
          </CardReadmore>
        </Card.Actions>
      </StyledLinearGradient>
    </DevotionalCard>
  );
};
