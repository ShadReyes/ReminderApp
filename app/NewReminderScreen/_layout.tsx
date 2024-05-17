import { Slot, Stack } from "expo-router";
import { ImageBackground, View } from "react-native";

export default function NewReminderScreenLayout() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgroundImage.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        {/* <Slot screenOptions={{ headerShown: false }} /> */}
        <Stack
          screenOptions={{ headerShown: false, title: "", headerTitle: "" }}
        >
          <Stack.Screen
            options={{ headerShown: false, title: "", headerTitle: "" }}
            name="index"
          />
        </Stack>
      </ImageBackground>
    </View>
  );
}
