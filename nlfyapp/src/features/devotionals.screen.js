import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import { Searchbar } from "react-native-paper";
import { ExpandCollapseList } from "../components/expandCollapse.component";

const ContainerView = styled(SafeAreaView)`
  padding: 0px 24px 0px 24px;
`;
const DevotionalHeadingRowView = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;
const DevotionalsHeading = styled(Text)`
  padding-left: 10px;
  color: ${(props) => props.theme.colors.text.title};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.header};
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;
const BackArrow = styled(Ionicons)`
  color: ${(props) => props.theme.colors.text.title};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.header};
`;

const DevotionalSearchbar = styled(Searchbar)`
  margin-bottom: 12px;
`;
const RowView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const FilterText = styled(Text)`
  border: 1px solid ${(props) => props.theme.colors.bg.disabled};
  color: ${(props) => props.theme.colors.text.caption};
  border-radius: 20px;
  text-align-vertical: center;
  text-align: center;
  padding: 0px 8px;
  height: 24px;
`;

export const Devotionals = () => {
  var data = [
    {
      id: 1,
      date: "25/12/2022",
      title: "God’s guidance wont leave you confused” - Rick Warren",
      textInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget risus faucibus tortor commodo lobortis. Fusce molestie massa venenatis, pellentesque nibh non, mollis diam. Cras vitae massa consequat, placerat dolor eu, blandit magna. Sed scelerisque, purus sed sollicitudin viverra, nisi eros pharetra ex, vitae sagittis urna elit sed urna. Cras rhoncus fringilla sapien id porttitor. Nunc auctor, lacus et vehicula dapibus, est mi imperdiet felis, quis eleifend purus lorem eu risus. Integer sapien lacus, ullamcorper ut sodales et, viverra vitae est.",
    },
    {
      id: 2,
      date: "27/11/2022",
      title: "God’s guidance wont leave you confused” - Rick Warren",
      textInfo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      date: "24/11/2022",
      title: "God’s guidance wont leave you confused” - Rick Warren",
      textInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget risus faucibus tortor commodo lobortis. Fusce molestie massa venenatis, pellentesque nibh non, mollis diam. Cras vitae massa consequat, placerat dolor eu, blandit magna. Sed scelerisque, purus sed sollicitudin viverra, nisi eros pharetra ex, vitae sagittis urna elit sed urna. Cras rhoncus fringilla sapien id porttitor. Nunc auctor, lacus et vehicula dapibus, est mi imperdiet felis, quis eleifend purus lorem eu risus. Integer sapien lacus, ullamcorper ut sodales et, viverra vitae est.",
    },
    {
      id: 4,
      date: "22/10/2022",
      title: "God’s guidance wont leave you confused” - Rick Warren",
      textInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget risus faucibus tortor commodo lobortis. Fusce molestie massa venenatis, pellent",
    },
    {
      id: 5,
      date: "12/10/2022",
      title: "God’s guidance wont leave you confused” - Rick Warren",
      textInfo:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget risus faucibus tortor commodo lobortis. Fusce molestie massa venenatis, pellent",
    },
  ];
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ContainerView>
      <DevotionalHeadingRowView>
        <BackArrow name="arrow-back" size={12} color="#F26924" />
        <DevotionalsHeading>Devotionals</DevotionalsHeading>
      </DevotionalHeadingRowView>
      <DevotionalSearchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <RowView>
        <FilterText>Latests</FilterText>
        <FilterText>Work</FilterText>
        <FilterText>Family</FilterText>
        <FilterText>Marriage</FilterText>
      </RowView>
      <ExpandCollapseList data={data} />
    </ContainerView>
  );
};
