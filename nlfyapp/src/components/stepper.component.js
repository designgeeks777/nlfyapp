import React, { FC, useState, ReactElement, useEffect } from "react";
import { View, Text } from "react-native";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";

export const Stepper = (props) => {
  <View style={{ flex: 1 }}>
    <ProgressSteps>
      <ProgressStep label="First Step">
        <View style={{ alignItems: "center" }}>
          <Text>This is the content within step 1!</Text>
        </View>
      </ProgressStep>
      <ProgressStep label="Second Step">
        <View style={{ alignItems: "center" }}>
          <Text>This is the content within step 2!</Text>
        </View>
      </ProgressStep>
      <ProgressStep label="Third Step">
        <View style={{ alignItems: "center" }}>
          <Text>This is the content within step 3!</Text>
        </View>
      </ProgressStep>
    </ProgressSteps>
  </View>;
};
