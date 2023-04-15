import React, { useCallback, useEffect, useState } from "react";
import { Text, FlatList, View, Dimensions } from "react-native";
import { Button, Card, Searchbar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../APIKey";

const { width, height } = Dimensions.get("window");

const SearchBar = styled(Searchbar)`
  margin-horizontal: 10px;
  margin-vertical: 20px;
  elevation: 0;
  border-radius: 10px;

  ${({ isFocused }) =>
    isFocused &&
    `
    border-width: 1px;
    border-color: orange;
  `}
`;

const ViewSearchbar = styled(View)`
  padding: 10px;
`;

const CardView = styled(View)`
  padding: 0 24px 24px 24px;
`;

const StyledLinearGradient = styled(LinearGradient)`
  border-radius: 10px;
  justify-content: center;
`;

const CardDate = styled(Text)`
  color: ${(props) => props.theme.colors.text.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.button};
`;

const CardTitle = styled(Text)`
  padding: 8px 8px 0px 8px;
  text-align-vertical: center;
  text-align: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.primary};
`;

const CardContent = styled(Text)`
  padding: 12px 8px 8px 8px;
  text-align: center;
  text-align-vertical: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-size: ${(props) => props.theme.fontSizes.title};
  font-weight: ${(props) => props.theme.fontWeights.regular};
  font-family: ${(props) => props.theme.fonts.body};
  line-height: ${(props) => props.theme.lineHeights.button};
  font-style: italic;
`;

const CardButton = styled(Button).attrs({
  textColor: "#FFFFFF",
  labelStyle: { fontSize: 12, lineHeight: 12 },
})``;

const Item = (props) => {
  const [lengthMore, setLengthMore] = useState(false); //to Expand or Collapse

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > 4); //to check the text is more than 4 lines or not
  }, []);
  return (
    <>
      <CardView>
        <CardDate>
          {props.item.datePosted}
          {props.screenName === "stories"
            ? ` - by ${props.item.submittedBy}`
            : null}
        </CardDate>
        <Card>
          <StyledLinearGradient
            start={{ x: 180, y: 0.25 }}
            end={{ x: 180, y: 1.0 }}
            colors={
              (["#E94A27", "rgba(242, 110, 36, 1)"],
              ["#F26924", "rgba(242, 73, 36, 0.76)"])
            }
          >
            {props.screenName === "devotionals" ? (
              <CardTitle adjustsFontSizeToFit numberOfLines={1}>
                {props.item.subject}
              </CardTitle>
            ) : null}
            <CardContent
              onTextLayout={onTextLayout}
              numberOfLines={props.selected ? null : 4}
            >
              {props.item.content}
            </CardContent>
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
                    size={12}
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
export const ExpandCollapseList = ({ screenName }) => {
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
    const url = `${BASEURL}/${
      screenName === "devotionals" ? "devotionals" : "stories"
    }`;
    const loadData = async () => {
      try {
        const response = await axios.get(url, {
          cancelToken: source.token,
        });
        //Sort devotionals/stories in ascending order based on date
        //Converting string date object to date to for sorting
        let filteredDatas = response.data.map((obj) => {
          const [day, month, year] = obj.datePosted.split("-");
          let devotionalDate = new Date(year, month - 1, day);
          return { ...obj, date: devotionalDate };
        });
        filteredDatas = filteredDatas.sort((a, b) => {
          return b.date.getTime() > a.date.getTime();
        });
        console.log(filteredDatas);
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
    if (id === selectedId) return setSelectedId(null);
    setSelectedId(id);
  };

  //for devotinals filter search based on subject of the devotional
  //for stories filter based on content
  const filteredData = data.filter((item) => {
    if (screenName === "devotionals") {
      return item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return item.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
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
        <Text style={{ paddingLeft: 24 }}>
          Loading {screenName === "devotionals" ? "devotionals" : "stories"}...
        </Text>
      ) : (
        <>
          {filteredData.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 0 }}
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
            <Text style={{ paddingLeft: 24 }}>
              No {screenName === "devotionals" ? "devotionals" : "stories"}{" "}
              found
            </Text>
          )}
        </>
      )}
    </>
  );
};
