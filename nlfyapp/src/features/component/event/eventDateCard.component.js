import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Text } from "react-native-paper";
import { Divider } from "../../../components/divider.component";
import { BASEURL } from "../../../../APIKey";
import axios from "axios";
import styled from "styled-components";

const { width, height } = Dimensions.get("window");
const padding = width;

const ViewEventCard = styled(SafeAreaView)`
  padding-top: ${padding * 0.01}px;
  padding-right: ${padding * 0.04}px;
  padding-bottom: ${padding * 0.01}px;
  padding-left: ${padding * 0.04}px;
`;

const MonthHeading = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom: ${padding * 0.04}px;
  margin-top: ${padding * 0.1 - 60}px;
`;

const StyledLinearGradient = styled(LinearGradient)`
  height: ${height * 0.1}px;
  border-radius: 15px;
  justify-content: center;
  width: ${width * 0.2}px;
`;

const EventCard = styled(Card)`
  shadow-color: transparent;
  border-color: transparent;
  background-color: "transparent";
  height: ${height * 0.15}px;
  border-radius: 15px;
  top: ${height * 0.02}px;
  width: ${width * 0.2}px;
`;

const CardWrapperView = styled(View)`
  flex-direction: row;
`;

const DividerPadding = styled(Card)`
  margin-bottom: ${height * 0.02}px;
`;

const EventCardContent = styled(Text)`
  padding: ${padding * 0.003}px;
  text-align-vertical: center;
  text-align: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const Content = styled(View)`
  top: ${height * 0.02}px;
  padding-left: ${padding * 0.04}px;
`;

const EventHeading = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.button};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const EventTiming = styled(Text)`
  padding-top: ${padding * 0.01}px;
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  font-family: ${(props) => props.theme.fonts.body};
  padding-bottom: ${padding * 0.01}px;
`;

const EventLocation = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
`;

const SearchBar = styled(Searchbar)`
  margin-horizontal: ${padding * 0.01}px;
  margin-vertical: ${padding * 0.01}px;
  elevation: 0;
  border-radius: ${width * 0.04}px;

  ${({ isFocused }) =>
    isFocused &&
    `
    border-width: 1px;
    border-color: orange;
  `}
`;

const ViewSearchbar = styled(View)`
  padding: ${padding * 0.03}px;
`;

const EventItem = ({ event }) => {
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const eventMonth = parseInt(event.dateOfEvent.split("/")[1], 10);
  const monthName = monthNames[eventMonth - 1];
  return (
    <>
      <CardWrapperView>
        <EventCard>
          <StyledLinearGradient
            start={{ x: 180, y: 0.25 }}
            end={{ x: 180, y: 1.0 }}
            colors={
              (["#D03925", "rgba(242, 36, 36, 1)"],
              ["#D03925", "rgba(242, 90, 36, 1)"])
            }
          >
            <EventCardContent adjustsFontSizeToFit numberOfLines={2}>
              {monthName}
            </EventCardContent>
            <EventCardContent adjustsFontSizeToFit numberOfLines={2}>
              {event.dateOfEvent.split("/")[0]}
            </EventCardContent>
          </StyledLinearGradient>
        </EventCard>
        <Content>
          <EventHeading>{event.nameOfEvent}</EventHeading>
          <EventTiming>
            {event.startTimeOfEvent.split(":")[0] % 12 || 12}:
            {event.startTimeOfEvent.split(":")[1]}
            {event.startTimeOfEvent.split(":")[0] >= 12 ? " PM" : " AM"}{"   "}
             -  {event.endTimeOfEvent.split(":")[0] % 12 || 12}:
            {event.endTimeOfEvent.split(":")[1]}
            {event.endTimeOfEvent.split(":")[0] >= 12 ? " PM" : " AM"}{" "}
          </EventTiming>
          <EventLocation>{`${event.placeOfEvent}`}</EventLocation>
        </Content>
      </CardWrapperView>
      <Divider />
      <DividerPadding />
    </>
  );
};

export const EventDateCard = () => {
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${BASEURL}events/`;
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        // Get the current date
        const currentDate = new Date();

        // Calculate the date two weeks from now
        const twoWeeksLater = new Date(currentDate);
        twoWeeksLater.setDate(currentDate.getDate() + 14);

        // Filter the events which are more than or equal to the current date
        // and less than or equal to two weeks later
        const filteredDatas = response.data.filter((dat) => {
          const [day, month, year] = dat.dateOfEvent.split("/");
          const eventDate = new Date(year, month - 1, day);

          // Check if the event date is greater than or equal to the current date
          // and less than or equal to two weeks later
          return eventDate >= currentDate && eventDate <= twoWeeksLater;
        });

        // Sort the filtered data by dateOfEvent in ascending order
        filteredDatas.sort((a, b) => {
          const [dayA, monthA, yearA] = a.dateOfEvent.split("/");
          const [dayB, monthB, yearB] = b.dateOfEvent.split("/");
          const dateA = new Date(yearA, monthA - 1, dayA);
          const dateB = new Date(yearB, monthB - 1, dayB);

          return dateA - dateB;
        });

        setData(filteredDatas);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          console.error(error);
        }
      }
    };

    loadData();

    const intervalId = setInterval(loadData, 5000);

    return () => {
      clearInterval(intervalId);
      source.cancel("Component unmounted");
    };
  }, []);

  const filteredData = data.filter((event) =>
    event.nameOfEvent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
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
      <ViewEventCard>
        <MonthHeading>Upcoming Events</MonthHeading>

        {isLoading ? (
          <Text>Loading events...</Text>
        ) : (
          <>
            {filteredData.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={filteredData}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <EventItem event={item} />}
                initialNumToRender={data.length}
                contentContainerStyle={{ paddingBottom: width * 0.01 }}
              />
            ) : (
              <Text>No events found</Text>
            )}
          </>
        )}
      </ViewEventCard>
    </>
  );
};
