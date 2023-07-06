import "dotenv/config";

export default {
  expo: {
    extra: {
      eas: {
        projectId: "c23e907f-4bfc-4df9-a615-f3e6e466ae0d" 
      }
    },
    name: "nlfyapp",
    slug: "nlfyapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.designGeeks.nlfyapp",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/icon.png",
      config: {
        firebase: {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
          appId: process.env.REACT_APP_FIREBASE_APP_ID,
        },
      },
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
          cameraPermission: "Allow $(PRODUCT_NAME) to open the camera",
          "//": "Disables the microphone permission",
          microphonePermission: false,
        },
      ],
    ],
  },
};
