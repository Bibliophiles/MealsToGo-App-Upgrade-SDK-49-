import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/infrastructure/theme";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

import { Navigation } from "./src/infrastructure/navigation";

import { getApps, initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDnYMSrn8u6TY8jBmklTJWMY1S-WmHF8dQ",
  authDomain: "mealstogo-c6587.firebaseapp.com",
  projectId: "mealstogo-c6587",
  storageBucket: "mealstogo-c6587.appspot.com",
  messagingSenderId: "941644234180",
  appId: "1:941644234180:web:2025c43d370952dbdc3891",
};

let app;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>

      <ExpoStatusBar style="auto" />
    </>
  );
}
