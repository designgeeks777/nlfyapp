import React from "react";
import styled from "styled-components";
import { Card, Text } from "react-native-paper";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LifeGroupCardWrapperView = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LifeGroupCard = styled(Card)`
  shadow-color: transparent;
  border-color: transparent;
  background-color: "transparent";
  height: 80px;
  border-radius: 15px;
  margin: 3px;
  top: 10px;
`;

const StyledLinearGradient = styled(LinearGradient)`
  height: 80px;
  border-radius: 15px;
  justify-content: center;
  margin: 3px;
`;

const LifeGroupCardContent = styled(Text)`
  padding: 6px;
  text-align-vertical: center;
  text-align: center;
  color: ${(props) => props.theme.colors.text.inverse};
  font-family: ${(props) => props.theme.fonts.body};
`;

export const LifeGroupCardList = () => {
  return (
    <LifeGroupCardWrapperView>
      <LifeGroupCard>
        <StyledLinearGradient
          start={{ x: 180, y: 0.25 }}
          end={{ x: 180, y: 1.0 }}
          colors={["#E94A27", "#F26924"]}
        >
          <LifeGroupCardContent adjustsFontSizeToFit numberOfLines={1}>
            Amruthahalli
          </LifeGroupCardContent>
        </StyledLinearGradient>
      </LifeGroupCard>
      <LifeGroupCard>
        <StyledLinearGradient
          start={{ x: 180, y: 0.25 }}
          end={{ x: 180, y: 1.0 }}
          colors={["#E94A27", "#F26924"]}
        >
          <LifeGroupCardContent adjustsFontSizeToFit numberOfLines={1}>
            Vidyaranyapura
          </LifeGroupCardContent>
        </StyledLinearGradient>
      </LifeGroupCard>
      <LifeGroupCard>
        <StyledLinearGradient
          start={{ x: 180, y: 0.25 }}
          end={{ x: 180, y: 1.0 }}
          colors={["#E94A27", "#F26924"]}
        >
          <LifeGroupCardContent adjustsFontSizeToFit numberOfLines={1}>
            Yelahanka
          </LifeGroupCardContent>
        </StyledLinearGradient>
      </LifeGroupCard>
    </LifeGroupCardWrapperView>
  );
};
