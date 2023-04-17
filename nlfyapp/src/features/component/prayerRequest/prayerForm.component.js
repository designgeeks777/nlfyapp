// //============================ERRORHANDLING CODE===========================

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Dimensions, Text } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components/native";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// import { FailureModalContent } from "../../../components/failureModalContent.component";
// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled.View`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const PrayerForm = ({
//   request,
//   handleCloseModal,
//   handleSuccessChange,
// }) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [failure, setFailure] = useState("");

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     if (text.trim() === "") {
//       return; // return early if text is empty or only contains whitespace
//     }
//     // // Check if text is empty
//     // if (text.trim() === "") {
//     //   setFailure("Field cannot be empty.");
//     //   return;
//     // }
//     // Check if text doesn't start with an alphabet
//     // if (!/^[a-zA-Z0-9]/.test(text.trim())) {
//     //   setFailure("Please write a valid Prayer.");
//     //   return;
//     // }

//     // Check if text contains at least one alphabet
//     if (!/[a-zA-Z]/.test(text.trim())) {
//       setFailure("Please enter at least one alphabet.");
//       return;
//     }

//     // Check if text contains only numbers
//     if (/^\d+$/.test(text.trim())) {
//       setFailure("Please enter a valid Prayer.");
//       return;
//     }
//     const existingResponses = [...request.responses];
//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     const newResponse = {
//       responseBy: "Tia",
//       responseMessage: text,
//       dateOfResponse: formattedDate,
//     };
//     existingResponses.push(newResponse);

//     const updateBody = {
//       responses: existingResponses,
//     };

//     const url = `${BASEURL}prayerRequests/${request._id}`;
//     axios
//       .patch(url, updateBody)
//       .then((response) => {
//         console.log("Response:", response.status);
//         if (response.status === 200) {
//           console.log("Success");
//           setSuccess(true);
//         } else {
//           setFailure("An error occurred. Please try again later.");
//         }
//       })
//       .catch((err) => {
//         console.log(err.message);
//         if (err.response) {
//           console.log("Response Error:", err.response.status);
//           if (err.response.status === 400) {
//             console.log("Request Error: Invalid request. Please try again.");
//             setFailure("Invalid request. Please try again.");
//           } else if (err.response.status === 404) {
//             console.log("Request Error: Request not found. Please try again.");
//             setFailure("Request not found. Please try again.");
//           } else {
//             console.log(
//               "Request Error: An error occurred. Please try again later."
//             );
//             //setFailure("An error occurred. Please try again later.");
//             setFailure(err.response.data.message); // Set failure to the error message returned by the API
//           }
//         } else {
//           console.log(
//             "Network Error: An error occurred. Please check your network connection."
//           );
//           setFailure(
//             "An error occurred. Please check your network connection."
//           );
//         }
//       });
//   };

//   useEffect(() => {
//     handleSuccessChange(success);
//   }, [success, handleSuccessChange]);

//   return (
//     <>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <TextInput
//           placeholder="Enter your prayer here"
//           style={styles.inp}
//           multiline={true}
//           textAlignVertical="top"
//           value={text}
//           onChangeText={(value) => {
//             setText(value);
//             setFailure(""); // Clear error message when user starts typing
//           }}
//           onFocus={() => setInputFocused(true)}
//           onBlur={() => setInputFocused(false)}
//         />
//         {/* {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>} */}
//         {failure !== "" && (
//           <FailureModalContent message={failure} style={styles.errorMessage} />
//         )}
//       </View>
//       {!inputFocused && (
//         <ButtonWrapper>
//           {/* <Button label="Submit" handleClick={handleSubmit} /> */}
//           <Button
//             label="Submit"
//             handleClick={handleSubmit}
//             //onPress={handleSubmit}
//             disabled={text.trim() === ""} // Pass the disableSubmit state to the button
//           />
//         </ButtonWrapper>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inp: {
//     height: 200,
//     width: "100%",
//     borderRadius: 10,
//     borderColor: "gray",
//     borderWidth: 1,
//     padding: 10,
//   },
// });

//===================ONLY SUCCESS CODE======================================

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Dimensions } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";

// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const PrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = () => {
//     // handle the submission of the prayer request here

//     console.log("props.request", props.request);

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       }
//     };

//     const existingresponses = [...props.request.responses];
//     /*props.request.responses.map((response) => {
//       existingresponses.push(response);
//     });*/

//     //get current date and add
//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
//     console.log("Formatted Date", formattedDate);
//     const newresponse = {
//       responseBy: "Tia",
//       responseMessage: text,
//       dateOfResponse: formattedDate,
//     };
//     existingresponses.push(newresponse);

//     const updateBody = {
//       responses: existingresponses,
//     };

//     console.log("Existing Responses:", existingresponses);
//     const url = `${BASEURL}prayerRequests/${props.request._id}`;
//     console.log("url:", url);
//     axios
//       .patch(url, updateBody)
//       .then(responseHandler)
//       .catch((err) => console.log(err));
//     //console.log("Response Data", data);
//     //props.handleCloseModal();
//   };

//   useEffect(() => {
//     props.handleSuccessChange(success);
//   }, [success, props]);

//   return (
//     <>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <TextInput
//           placeholder="Enter your prayer here"
//           mode="outlined"
//           style={styles.inp}
//           textAlignVertical="top"
//           value={text} // bind text state variable to input field
//           onChangeText={(value) => setText(value)} // update text state variable whenever user types into input field
//           onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//           onBlur={() => setInputFocused(false)}
//         />
//       </View>
//       {!inputFocused && (
//         <View style={styles.buttonwrapper}>
//           <Button label="Submit" handleClick={handleSubmit} />
//         </View>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inp: {
//     height: 200,
//     width: "100%",
//     borderRadius: 10,
//     borderColor: "gray",
//     borderWidth: 1,
//     padding: 10,
//   },
//   buttonwrapper: {
//     paddingBottom: width * 0.1,
//     alignItems: "center",
//   },
// });

//==================PROPER WORKING CODE=========

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";

// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const PrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [failure, setFailure] = useState(true);
//   const [inputBorderColor, setInputBorderColor] = useState("gray");
//   const [disableSubmit, setDisableSubmit] = useState(true);

//   const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
//   // Error messages
//   const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
//   const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

//   const handleTextChange = (value) => {
//     // setText(value);
//     if (value.trim().length <= MAX_INPUT_LENGTH) {
//       setText(value);
//     }

//     // Check if input value is valid or not
//     if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
//       setFailure(INVALID_PRAYER_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }
//     // Check if input value exceeds maximum allowed length
//     if (value.trim().length > MAX_INPUT_LENGTH) {
//       setFailure(MAX_LENGTH_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }

//     // Clear error message and reset input border color if no errors
//     setFailure("");
//     setInputBorderColor("gray");
//     setDisableSubmit(false);
//   };

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     if (text.trim() === "") {
//       return; // return early if text is empty or only contains whitespace
//     }

//     console.log("props.request", props.request);

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       } else {
//         setFailure("An error occurred. Please try again later.");
//         setInputBorderColor("red");
//       }
//     };

//     const existingresponses = [...props.request.responses];

//     //get current date and add
//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
//     console.log("Formatted Date", formattedDate);
//     const newresponse = {
//       responseBy: "Tia",
//       responseMessage: text,
//       dateOfResponse: formattedDate,
//     };
//     existingresponses.push(newresponse);

//     const updateBody = {
//       responses: existingresponses,
//     };

//     console.log("Existing Responses:", existingresponses);
//     const url = `${BASEURL}prayerRequests/${props.request._id}`;
//     console.log("url:", url);
//     axios
//       .patch(url, updateBody)
//       .then(responseHandler)
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     props.handleSuccessChange(success);
//   }, [success, props]);

//   return (
//     <>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <TextInput
//           placeholder="Enter your prayer here"
//           mode="outlined"
//           style={[
//             styles.inp,
//             {
//               borderColor: inputBorderColor,
//             },
//           ]}
//           multiline={true} // enable multiline
//           textAlignVertical="top"
//           value={text}
//           onChangeText={handleTextChange}
//           onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//           onBlur={() => setInputFocused(false)}
//         />
//         {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>}
//       </View>
//       {!inputFocused && (
//         <ButtonWrapper
//           style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//         >
//           <Button
//             label="Submit"
//             handleClick={handleSubmit}
//             disabled={disableSubmit}
//           />
//         </ButtonWrapper>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inp: {
//     height: 200,
//     width: "100%",
//     borderRadius: 10,
//     borderWidth: 1,
//     padding: 10,
//   },
//   errorMessage: {
//     color: "red",
//   },
// });

//=========working on the error handling above code is properly working code

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const PrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [failure, setFailure] = useState(true);
//   const [inputBorderColor, setInputBorderColor] = useState("gray");
//   const [disableSubmit, setDisableSubmit] = useState(true);

//   const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
//   // Error messages
//   const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
//   const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

//   const handleTextChange = (value) => {
//     // setText(value);
//     if (value.trim().length <= MAX_INPUT_LENGTH) {
//       setText(value);
//       setFailure(""); // Clear error message when user starts typing
//     }

//     // Check if input value is valid or not
//     if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
//       setFailure(INVALID_PRAYER_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }
//     // Check if input value exceeds maximum allowed length
//     if (value.trim().length > MAX_INPUT_LENGTH) {
//       setFailure(MAX_LENGTH_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }

//     // Clear error message and reset input border color if no errors
//     setFailure("");
//     setInputBorderColor("gray");
//     setDisableSubmit(false);
//   };

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     if (text.trim() === "") {
//       return; // return early if text is empty or only contains whitespace
//     }

//     console.log("props.request", props.request);

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       } else {
//         setFailure("An error occurred. Please try again later.");
//         setInputBorderColor("red");
//       }
//     };

//     const existingresponses = [...props.request.responses];

//     //get current date and add
//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
//     console.log("Formatted Date", formattedDate);
//     const newresponse = {
//       responseBy: "Tia",
//       responseMessage: text,
//       dateOfResponse: formattedDate,
//     };
//     existingresponses.push(newresponse);

//     const updateBody = {
//       responses: existingresponses,
//     };

//     console.log("Existing Responses:", existingresponses);
//     const url = `${BASEURL}prayerRequests/${props.request._id}`;
//     console.log("url:", url);
//     axios
//       .patch(url, updateBody)
//       .then(responseHandler)
//       //.catch((err) => console.log(err));
//       .catch((err) => {
//         console.log(err.message);
//         if (err.response) {
//           console.log("Response Error:", err.response.status);
//           if (err.response.status === 400) {
//             console.log("Request Error: Invalid request. Please try again.");
//             setFailure("Invalid request. Please try again.");
//           } else if (err.response.status === 404) {
//             console.log("Request Error: Request not found. Please try again.");
//             setFailure("Request not found. Please try again.");
//           } else {
//             console.log(
//               "Request Error: An error occurred. Please try again later."
//             );
//             //setFailure("An error occurred. Please try again later.");
//             setFailure(err.response.data.message); // Set failure to the error message returned by the API
//           }
//         } else {
//           console.log(
//             "Network Error: An error occurred. Please check your network connection."
//           );
//           setFailure(
//             "An error occurred. Please check your network connection."
//           );
//         }
//       });
//   };

//   useEffect(() => {
//     props.handleSuccessChange(success);
//   }, [success, props]);

//   return (
//     <>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <TextInput
//           placeholder="Enter your prayer here"
//           mode="outlined"
//           style={[
//             styles.inp,
//             {
//               borderColor: inputBorderColor,
//             },
//           ]}
//           multiline={true} // enable multiline
//           textAlignVertical="top"
//           value={text}
//           onChangeText={handleTextChange}
//           onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//           onBlur={() => setInputFocused(false)}
//         />
//         {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>}
//       </View>
//       {!inputFocused && (
//         <ButtonWrapper
//           style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//         >
//           <Button
//             label="Submit"
//             handleClick={handleSubmit}
//             disabled={disableSubmit}
//           />
//         </ButtonWrapper>
//       )}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inp: {
//     height: 200,
//     width: "100%",
//     borderRadius: 10,
//     borderWidth: 1,
//     padding: 10,
//   },
//   errorMessage: {
//     color: "red",
//   },
// });

//===================Fully WORKING CODE PERFECT=================

// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
// import { Button } from "../../../components/button";
// import styled from "styled-components";
// import axios from "axios";
// import { BASEURL } from "../../../../APIKey";
// import { FailureModalContent } from "../../../components/failureModalContent.component";

// const { width } = Dimensions.get("window");

// const ButtonWrapper = styled(View)`
//   padding-bottom: 30px;
//   align-items: center;
// `;

// export const PrayerForm = (props) => {
//   const [text, setText] = useState("");
//   const [inputFocused, setInputFocused] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [failure, setFailure] = useState(true);
//   const [inputBorderColor, setInputBorderColor] = useState("gray");
//   const [disableSubmit, setDisableSubmit] = useState(true);
//   const [errorMessage, setErrorMessage] = useState("");

//   const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
//   // Error messages
//   const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
//   const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

//   const handleTextChange = (value) => {
//     // setText(value);
//     if (value.trim().length <= MAX_INPUT_LENGTH) {
//       setText(value);
//       setFailure(""); // Clear error message when user starts typing
//     }

//     // Check if input value is valid or not
//     if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
//       setFailure(INVALID_PRAYER_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }
//     // Check if input value exceeds maximum allowed length
//     if (value.trim().length > MAX_INPUT_LENGTH) {
//       setFailure(MAX_LENGTH_ERROR);
//       setInputBorderColor("red");
//       setDisableSubmit(true);
//       return;
//     }

//     // Clear error message and reset input border color if no errors
//     setFailure("");
//     setInputBorderColor("gray");
//     setDisableSubmit(false);
//   };

//   const handleSubmit = () => {
//     console.log("Submit clicked");
//     if (text.trim() === "") {
//       return; // return early if text is empty or only contains whitespace
//     }

//     console.log("props.request", props.request);

//     const responseHandler = (response) => {
//       console.log("Response:", response.status);
//       if (response.status === 200) {
//         console.log("Success");
//         setSuccess(true);
//       } else {
//         console.log("Error");
//         setErrorMessage(
//           <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
//         );
//         // setErrorMessage(
//         //   "Sorry, we couldnt process the request Please try after sometime."
//         // );
//         setInputBorderColor("red");
//       }
//     };

//     const existingresponses = [...props.request.responses];

//     //get current date and add
//     const currentDate = new Date();
//     const day = currentDate.getDate().toString().padStart(2, "0");
//     const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
//     console.log("Formatted Date", formattedDate);
//     const newresponse = {
//       responseBy: "Tia",
//       responseMessage: text,
//       dateOfResponse: formattedDate,
//     };
//     existingresponses.push(newresponse);

//     const updateBody = {
//       responses: existingresponses,
//     };

//     console.log("Existing Responses:", existingresponses);
//     const url = `${BASEURL}prayerRequests/${props.request._id}`;
//     console.log("url:", url);
//     axios
//       .patch(url, updateBody)
//       .then(responseHandler)
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     props.handleSuccessChange(success);
//   }, [success, props]);

//   return (
//     <>
//       <View style={{ flex: 1, alignItems: "center" }}>
//         <TextInput
//           placeholder="Enter your prayer here"
//           mode="outlined"
//           style={[
//             styles.inp,
//             {
//               borderColor: inputBorderColor,
//             },
//           ]}
//           multiline={true} // enable multiline
//           textAlignVertical="top"
//           value={text}
//           onChangeText={handleTextChange}
//           onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
//           onBlur={() => setInputFocused(false)}
//         />
//         {failure !== "" && <Text style={styles.errorMessage}>{failure}</Text>}
//       </View>
//       {/* {!inputFocused && (
//         <ButtonWrapper
//           style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//         >
//           {errorMessage ? (
//             <Text>{errorMessage}</Text>
//           ) : (
//             <Button
//               label="Submit"
//               handleClick={handleSubmit}
//               disabled={disableSubmit}
//             />
//           )}
//         </ButtonWrapper>
//       )} */}
//       {!inputFocused && (
//         <ButtonWrapper
//           style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
//         >
//           <Button
//             label="Submit"
//             handleClick={handleSubmit}
//             disabled={disableSubmit}
//           />
//         </ButtonWrapper>
//       )}
//       {/* {failure && (
//         <FailureModalContent message="Sorry, we couldnt process the request Please try after sometime." />
//       )} */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   inp: {
//     height: 200,
//     width: "100%",
//     borderRadius: 10,
//     borderWidth: 1,
//     padding: 10,
//   },
//   errorMessage: {
//     color: "red",
//   },
// });

//================working on this code

import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Dimensions } from "react-native";
import { Button } from "../../../components/button";
import styled from "styled-components";
import axios from "axios";
import { BASEURL } from "../../../../APIKey";
import { FailureModalContent } from "../../../components/failureModalContent.component";

const { width } = Dimensions.get("window");

const ButtonWrapper = styled(View)`
  padding-bottom: 30px;
  align-items: center;
`;

export const PrayerForm = (props) => {
  const [text, setText] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(true);
  const [inputBorderColor, setInputBorderColor] = useState("gray");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const MAX_INPUT_LENGTH = 100; // Maximum allowed length of input
  // Error messages
  const INVALID_PRAYER_ERROR = "Please enter a valid prayer request.";
  const MAX_LENGTH_ERROR = `Please limit your prayer request to ${MAX_INPUT_LENGTH} characters.`;

  const handleTextChange = (value) => {
    // setText(value);
    if (value.trim().length <= MAX_INPUT_LENGTH) {
      setText(value);
      setError(""); // Clear error message when user starts typing
    }

    // Check if input value is valid or not
    if (!/[a-zA-Z]/.test(value.trim()) || /^\d+$/.test(value.trim())) {
      setError(INVALID_PRAYER_ERROR);
      setInputBorderColor("red");
      setDisableSubmit(true);
      return;
    }
    // Check if input value exceeds maximum allowed length
    if (value.trim().length > MAX_INPUT_LENGTH) {
      setError(MAX_LENGTH_ERROR);
      setInputBorderColor("red");
      setDisableSubmit(true);
      return;
    }

    // Clear error message and reset input border color if no errors
    setError("");
    setInputBorderColor("gray");
    setDisableSubmit(false);
  };

  const handleSubmit = () => {
    console.log("Submit clicked");
    if (text.trim() === "") {
      return; // return early if text is empty or only contains whitespace
    }

    console.log("props.request", props.request);

    const existingresponses = [...props.request.responses];

    //get current date and add
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, "0");
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // add 1 to get the correct month since January is 0
    const year = currentDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    console.log("Formatted Date", formattedDate);

    const newresponse = {
      responseBy: "Tia",
      responseMessage: text,
      dateOfResponse: formattedDate,
    };
    existingresponses.push(newresponse);

    const updateBody = {
      responses: existingresponses,
    };

    console.log("Existing Responses:", existingresponses);
    const url = `${BASEURL}prayerRequests/${props.request._id}`;
    console.log("url:", url);
    axios
      .patch(url, updateBody)
      .then((response) => {
        console.log("Response:", response.status);
        if (response.status === 200) {
          console.log("Success");
          setSuccess(true);
        }
      })
      // .catch((error) => console.log(error));
      .catch((err) => {
        console.log(err);
        setError(true);
        setErrorMessage(
          "Sorry, we could not process the request. Please try again later."
        );
      });
  };

  useEffect(() => {
    props.handleSuccessChange(success);
  }, [success, props]);

  // useEffect(() => {
  //   props.handleErrorChange(error, errorMessage);
  // }, [error, errorMessage, props]);

  return (
    <>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TextInput
          placeholder="Enter your prayer here"
          mode="outlined"
          style={[
            styles.inp,
            {
              borderColor: inputBorderColor,
            },
          ]}
          multiline={true} // enable multiline
          textAlignVertical="top"
          value={text}
          onChangeText={handleTextChange}
          onFocus={() => setInputFocused(true)} // set inputFocused to true when TextInput is focused
          onBlur={() => setInputFocused(false)}
        />
        {error !== "" && <Text style={styles.errorMessage}>{error}</Text>}
      </View>
      {!inputFocused && (
        <ButtonWrapper
          style={{ opacity: disableSubmit ? 0.5 : 1 }} // Setting the opacity of the button based on the disableSubmit state
        >
          <Button
            label="Submit"
            handleClick={handleSubmit}
            disabled={disableSubmit}
          />
        </ButtonWrapper>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  inp: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  errorMessage: {
    color: "red",
  },
});
