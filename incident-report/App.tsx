import React from 'react';
import { StyleSheet } from 'react-native';
import { useFonts, PlayfairDisplay_400Regular, PlayfairDisplay_500Medium, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold, PlayfairDisplay_800ExtraBold, PlayfairDisplay_900Black } from "@expo-google-fonts/playfair-display";
import { ThemeProvider } from 'styled-components/native';
import defaultStyle from '@global/styles/default.styles';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import Toast from 'react-native-toast-message';
import { AuthProvider } from '@hooks/auth';
import { Routes } from '@routes/index';

export default function App() {
  const [fontsLoaded] = useFonts([
    PlayfairDisplay_400Regular,
    PlayfairDisplay_500Medium,
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    PlayfairDisplay_800ExtraBold,
    PlayfairDisplay_900Black
  ]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultStyle}>
      <AuthProvider>

        <ExpoStatusBar style='light' />

        <Routes />

        <Toast />
      </AuthProvider>
    </ThemeProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
