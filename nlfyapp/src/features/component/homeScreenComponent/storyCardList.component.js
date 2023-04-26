import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { FlatList } from "react-native";

import { BASEURL } from "../../../../APIKey";
import axios from "axios";

const StoryCard = styled(Card)`
  top: 10px;
  width: 225px;
  height: 100px;
  border-radius: 15px;
  border-width: 1px;
  border-color: #e3aa8d;
  background-color: ${(props) => props.theme.colors.bg.primary};
  shadow-color: transparent;
  margin-bottom: 14px;
  margin-right: 10px;
`;

const StoryCardContent = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const StoryCardList = () => {
  const [data, setData] = useState([]);
  const url = `${BASEURL}stories/`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        //console.log("response data", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  const renderItem = ({ item }) => (
    <StoryCard elevation={0}>
      <Card.Content>
        <StoryCardContent variant="bodyMedium" numberOfLines={3}>
          {`"${item.content}" - by ${item.submittedBy}`}
        </StoryCardContent>
      </Card.Content>
    </StoryCard>
  );

  return (
    <FlatList
      data={data.slice(0, data.length <= 2 ? data.length : 3)}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};
