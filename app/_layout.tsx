import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { CalendarContext } from "@/CalendarContext";
import { Text } from "react-native";
import { HStack } from "@/components/HStack";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedButton } from "@/components/AnimatedButton";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter-Regular.otf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <CalendarContext>
        <Stack screenOptions={{ header: () => <Header title="Home" /> }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CalendarContext>
    </ThemeProvider>
  );
}

interface IHeaderProps {
  title: string;
}

const Header = (props: IHeaderProps) => {
  const safeArea = useSafeAreaInsets();
  return (
    <HStack
      style={{
        marginTop: safeArea.top,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatedButton onPress={() => router.back()}>
        <HStack style={{ alignItems: "center" }}>
          <Ionicons name="chevron-back" size={30} color="white" />
          <Text style={{ color: "white", fontSize: 20 }}>{props.title}</Text>
        </HStack>
      </AnimatedButton>
    </HStack>
  );
};
