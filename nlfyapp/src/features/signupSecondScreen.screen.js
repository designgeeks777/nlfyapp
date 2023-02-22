import React, { useState } from "react";
import { View, Button, TextInput, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Stepper = () => {
  const [step, setStep] = useState(0);
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleInputChange1 = (value) => {
    setValue1(value);
  };

  const handleInputChange2 = (value) => {
    setValue2(value);
  };

  const renderStep0 = () => (
    <SafeAreaView>
      <View>
        <Text>Step 1</Text>
        <TextInput value={value1} onChangeText={handleInputChange1} />
        <Button title="Next" onPress={handleNextStep} />
      </View>
    </SafeAreaView>
  );

  const renderStep1 = () => (
    <View>
      <Text>Step 2</Text>
      <TextInput value={value2} onChangeText={handleInputChange2} />
      <Button title="Prev" onPress={handlePrevStep} />
      <Button title="Next" onPress={handleNextStep} />
    </View>
  );

  const renderStep2 = () => (
    <View>
      <Text>Step 3</Text>
      <Button title="Prev" onPress={handlePrevStep} />
    </View>
  );

  const steps = [renderStep0, renderStep1, renderStep2];

  return steps[step]();
};
