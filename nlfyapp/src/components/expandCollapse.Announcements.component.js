import React, { useCallback, useEffect, useState } from "react";
import { Text, FlatList, View, Dimensions } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../APIKey";

const { width, height } = Dimensions.get("window");
const marginHorizontal = width * 0.01;
const marginVertical = width * 0.04;
const padding = width;
const SearchBar = styled(Searchbar)`
  margin-horizontal: ${marginHorizontal}px;
  margin-vertical: ${marginVertical}px;
  elevation: 0;
  border-radius: ${width * 0.03}px;

  ${({ isFocused }) =>
    isFocused &&
    `
    border-width: 1px;
    border-color: orange;
  `}
`;

const ViewSearchbar = styled(View)`
  padding: ${padding * 0.01}px;
`;

const CardView = styled(View)`
  padding-top: ${padding * 0.01}px;
  padding-right: ${padding * 0.06}px;
  padding-bottom: ${padding * 0.06}px;
  padding-left: ${padding * 0.06}px;
`;

const StyledLinearGradient = styled(LinearGradient)`
  border-radius: ${width * 0.03}px;
  justify-content: center;
`;

const CardDate = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.primary};
  margin-bottom: ${padding * 0.03}px;
`;

const CardTitle = styled(Text)`
  padding-top: ${(props) =>
    props.numberOfLines > 2 ? padding * 0.1 : padding * 0.05}px;
  padding-right: ${padding * 0.05}px;
  padding-bottom: ${(props) =>
    props.numberOfLines > 2 ? padding * 0.05 : padding * 0.02}px;
  padding-left: ${padding * 0.06}px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.primary};
  text-align-vertical: center;
  text-align: center;
`;

const CardAnnouncement = styled(Text)`
  padding-top: ${padding * 0.03}px;
  padding-right: ${padding * 0.04}px;
  padding-bottom: ${padding * 0.01}px;
  padding-left: ${padding * 0.05}px;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.caption};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.button};
  font-style: italic;
`;

const CardButton = styled(Button).attrs({
  textColor: "#FFFFFF",
  labelStyle: { fontSize: 12, lineHeight: width * 0.04 },
})``;

const Item = (props) => {
  const [lengthMore, setLengthMore] = useState(false); //to Expand or Collapse

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > 4); //to check the text is more than 4 lines or not
  }, []);
  return (
    <>
      <CardView>
        <CardDate>{props.item.datePosted}</CardDate>

        <Card>
          <StyledLinearGradient
            start={{ x: 180, y: 0.25 }}
            end={{ x: 180, y: 1.0 }}
            colors={
              (["#E94A27", "rgba(242, 110, 36, 1)"],
              ["#F26924", "rgba(242, 73, 36, 0.76)"])
            }
          >
            <CardTitle adjustsFontSizeToFit numberOfLines={1}>
              {props.item.title}
            </CardTitle>

            <CardAnnouncement
              onTextLayout={onTextLayout}
              numberOfLines={props.selected ? null : 4}
            >
              {props.item.announcement}
            </CardAnnouncement>
            {lengthMore ? (
              <Card.Actions>
                <CardButton
                  mode="text"
                  onPress={() => {
                    props.onSelect(props.id);
                  }}
                >
                  <Ionicons
                    name={props.selected ? "chevron-up" : "chevron-down"}
                    size={width * 0.04}
                  />
                  {props.selected ? "Collapse" : "Expand"}
                </CardButton>
              </Card.Actions>
            ) : null}
          </StyledLinearGradient>
        </Card>
      </CardView>
    </>
  );
};
export const ExpandCollapseListAnnouncements = ({ screenName }) => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${BASEURL}/announcements`;
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        //reverse the data to show the latest announcement on top
        let filteredDatas = response.data.reverse();
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
  }, [screenName]);

  const onSelectItem = (id) => {
    if (id === selectedId) {
      return setSelectedId(null);
    }
    setSelectedId(id);
  };

  //for Announcement filter search based on title of the Announcement
  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

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
      {isLoading ? (
        <Text style={{ paddingLeft: padding * 0.04 }}>Loading...</Text>
      ) : (
        <>
          {filteredData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              //contentContainerStyle={{ paddingBottom: 0 }}
              contentContainerStyle={{ paddingBottom: width * 0.01 }}
              data={filteredData}
              initialNumToRender={data.length}
              renderItem={({ item }) => (
                <Item
                  item={item}
                  selected={selectedId === item._id}
                  onSelect={onSelectItem}
                  id={item._id}
                  screenName={screenName}
                />
              )}
              keyExtractor={(item) => item._id}
              extraData={selectedId}
            />
          ) : (
            <Text style={{ paddingLeft: padding * 0.04 }}>
              No Announcements found
            </Text>
          )}
        </>
      )}
    </>
  );
};
