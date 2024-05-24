import { Stack } from "expo-router";

export default function NewReminderScreenLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, title: "", headerTitle: "" }}>
      <Stack.Screen
        options={{ headerShown: false, title: "", headerTitle: "" }}
        name="index"
      />
    </Stack>
  );
}
