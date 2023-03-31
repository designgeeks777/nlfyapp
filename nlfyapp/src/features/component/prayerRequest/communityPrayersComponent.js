import React, { useState, useRef } from "react";
import styled from "styled-components/native";
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/button";
import { PrayerForm } from "./prayerForm.component";
import { ExpandCollapseList } from "../../../components/expandCollapse.CommunityPrayer.component";

const ContainerView = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight || 0}px;
`;

const ButtonView = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const CommunityPrayers = () => {
  var data = [
    {
      _id: "642292f1dfe16a803fda708f",
      raisedBy: "Ria",
      requestMessage:
        "Hello, Keep praying for my job, this is the final week of my presentation, also pray for my family",
      profilePic: require("nlfyapp/assets/profile1.jpg"),
      dateOfPosting: "23/11/2023",
      responses: [],
      likes: [],
      __v: 0,
    },
    {
      _id: "64229306dfe16a803fda7091",
      raisedBy: "Robin",
      requestMessage:
        "Please pray for my family's health, Please pray for my family's health, Please pray for my family's health,  Please pray for my family's health,  Please pray for my family's health, Pray for my new job.",
      profilePic: require("nlfyapp/assets/profile2.jpg"),
      dateOfPosting: "23/11/2023",
      responses: [],
      likes: [],
      __v: 0,
    },
    {
      _id: "6422c3b4ca06f6fb57d3be90",
      raisedBy: "Sandeep",
      requestMessage: "Pray for my health",
      profilePic: require("nlfyapp/assets/profile1.jpg"),
      dateOfPosting: "23/11/2023",
      responses: [
        {
          responseBy: "Ria",
          responseMessage: "Praying",
          dateOfResponse: "23/11/2023",
        },
      ],
      likes: [],
      __v: 0,
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const slideAnimation = useRef(new Animated.Value(0)).current;

  const handleOpenModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const modalTranslateY = slideAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });
  return (
    <>
      <ContainerView>
        <ExpandCollapseList data={data} />
        <TouchableOpacity onPress={handleOpenModal} style={styles.spacing}>
          <Text style={styles.buttonText}>Write a Prayer</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} transparent={true}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleCloseModal}
            style={styles.modalOverlay}
          >
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateY: modalTranslateY }],
                  height: 500, // set the height as per your requirement
                },
              ]}
            >
              <Text style={styles.modalTitle}>Write a Prayer</Text>
              {/* add your form components for prayer request here */}
              <PrayerForm />
            </Animated.View>
          </TouchableOpacity>
        </Modal>
      </ContainerView>
      <ButtonView>
        <Button label="Raise Prayer Request" />
      </ButtonView>
    </>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#333333",
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  buttonText: {
    color: "#008BE2",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  spacing: {
    marginTop: -40,
    marginBottom: 40,
  },
});
