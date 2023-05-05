import * as firebase from "firebase/compat";
import Constants from "expo-constants";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: Constants.manifest?.web?.config?.firebase?.apiKey,
  authDomain: Constants.manifest?.web?.config?.firebase?.authDomain,
  projectId: Constants.manifest?.web?.config?.firebase?.projectId,
  storageBucket: Constants.manifest?.web?.config?.firebase?.storageBucket,
  messagingSenderId:
    Constants.manifest?.web?.config?.firebase?.messagingSenderId,
  appId: Constants.manifest?.web?.config?.firebase?.appId,
};

let firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
}

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, firebaseApp };
