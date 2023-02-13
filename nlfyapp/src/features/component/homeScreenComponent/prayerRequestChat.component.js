// /* eslint-disable prettier/prettier */
// import React from "react";
// import styled from "styled-components";
// import { Card, Text, View } from "react-native";
// import { Ionicons } from "@expo/vector-icons";

// const EventCard = styled(Card)`
//   top: 675px;
//   position: absolute;
//   right: 0px;
//   width: 280px;
//   height: 85px;
//   border-radius: 15px;
//   background-color: ["#F26924", "rgba(242, 105, 36, 0.15)"];
//   shadow-color: transparent;
// `;

// const EventCardContent = styled(Text)`
//   color: ${(props) => props.theme.colors.text.primary};
//   font-size: ${(props) => props.theme.fontSizes.body};
//   font-weight: ${(props) => props.theme.fontWeights.regular};
//   font-family: ${(props) => props.theme.fonts.body};
// `;

// // const LeftSideProfile = styled(View)`
// //   align-self: flex-start;
// // `;

// // const RightSideChat = styled(View)`
// //   align-self: flex-left
// // `;

// const Container = styled(View)`
//   flex-direction: row;
//   align-items: center;
// `;

// // export const PrayerRequestChat = () => {
// //   const cardContentText = "Keep praying for my job. This is the final week of presentation..";

// //   return (
// //     <>
// //       {/* <LeftSideProfile> */}
// //       <Ionicons
// //         name="person-circle-sharp"
// //         size={45}
// //         color="rgba(242, 105, 36, 0.6)" />
// //       {/* </LeftSideProfile> */}

// //       {/* <RightSideChat> */}
// //       <EventCard elevation={0}>
// //         <Card.Content>
// //           <EventCardContent numberOfLines={4} variant="bodyMedium">{cardContentText}</EventCardContent>
// //         </Card.Content>
// //       </EventCard>
// //       {/* </RightSideChat> */}
// //     </>
// //   );
// // };
// export const PrayerRequestChat = () => {
//   const cardContentText = "Keep praying for my job. This is the final week of presentation..";

//   return (
//     <Container>
//       <Ionicons
//         name="person-circle-sharp"
//         size={45}
//         color="rgba(242, 105, 36, 0.6)"
//       />
//       <EventCard elevation={0}>
//         <Card.Content>
//           <EventCardContent numberOfLines={4} variant="bodyMedium">{cardContentText}</EventCardContent>
//         </Card.Content>
//       </EventCard>
//     </Container>
//   );
// };
