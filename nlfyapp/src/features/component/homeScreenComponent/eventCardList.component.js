import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { Dimensions, FlatList } from "react-native";

import { BASEURL } from "../../../../APIKey";

import axios from "axios";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.4;

const EventCard = styled(Card)`
  top: ${width * 0.030}px;
  width: ${cardWidth}px;
  margin: ${width * 0.01}px;
  height: ${width * 0.36}px;

  border-radius: 15px;
  border-width: 1px;
  border-color: [ "#F26924", "rgba(242, 105, 36, 0.40)"];
  background-color: ${(props) => props.theme.colors.bg.primary};
  shadow-color: transparent;
  margin-bottom: ${width * 0.16}px;
`;

const EventCardTitle = styled(Text)`

  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const EventCardContent = styled(Text)`
  
  padding-top:${width * 0.001}px;
  color: ${(props) => props.theme.colors.text.title};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const EventCardList = () => {
  const [data, setData] = useState([]);
  const url = `${BASEURL}events/`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        //console.log("response sermon", response.data.items[0]);
        const currentDate = new Date();
        //Filter the events which are more than current date, dont show old events
        const filteredDatas = response.data.filter((dat) => {
          const [day, month, year] = dat.dateOfEvent.split("/");
          const eventDate = new Date(year, month - 1, day);
          return eventDate.getTime() > currentDate.getTime();
        });
        setData(filteredDatas);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  const renderItem = ({ item }) => (
    <EventCard>
      <Card.Content>
        <EventCardTitle variant="titleLarge">
          <EventCardContent>{item.nameOfEvent}</EventCardContent>
        </EventCardTitle>
        <EventCardContent variant="bodyMedium">
          <Text>{item.dateOfEvent}</Text>
        </EventCardContent>
        <EventCardContent variant="bodyMedium">
          <Text>{item.timeOfEvent}</Text>
        </EventCardContent>
      </Card.Content>
    </EventCard>
  );

  return (
    <>
      {data && (
        <FlatList
          data={data.slice(0, data.length <= 2 ? data.length : 3)}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </>
  );
};
