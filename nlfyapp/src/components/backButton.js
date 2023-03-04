import React from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

const BackText = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: ${(props) => props.theme.fontWeights.bold};
  font-size: ${(props) => props.theme.fontSizes.button};
  color: ${(props) => props.theme.colors.text.title};
  margin-left: 12px;
`;

export const BackButton = ({ text }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Icon name="angle-left" size={30} color="#F26924" />
        <BackText>{text}</BackText>
      </View>
    </TouchableOpacity>
  );
};
