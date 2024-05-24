import {
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCalendarContext } from "@/CalendarContext";
import { dateToLongDateString, getFormattedTime } from "@/helpers/dateHelpers";
import { observer } from "@legendapp/state/react";
import { Calendar } from "@/components/Calendar";
import { Link } from "expo-router";
import { AnimatedButton } from "@/components/AnimatedButton";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { MenuView } from "@react-native-menu/menu";

const HomeScreen = observer(() => {
  const calendarContext = useCalendarContext();

  const isModalOpen = useRef(false);
  const modalHeight = useSharedValue(60);
  const chevronRotation = useSharedValue(0);

  const safeArea = useSafeAreaInsets();

  const onOpenModal = () => {
    isModalOpen.current = true;
    modalHeight.value = withTiming(94);
    chevronRotation.value = withTiming(180);
  };

  const onCloseModal = () => {
    isModalOpen.current = false;
    modalHeight.value = withTiming(60);
    chevronRotation.value = withTiming(0);
  };

  const rModalContainerStyle = useAnimatedStyle(() => {
    return {
      height: `${modalHeight.value}%`,
    };
  });

  const rChevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateX: `${chevronRotation.value}deg` }],
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgroundImage.jpg")}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={{ marginTop: safeArea.top, marginHorizontal: 10 }}>
          <Calendar />
        </View>
        <Animated.View style={[rModalContainerStyle, styles.modalContainer]}>
          <Pressable
            onPress={() =>
              isModalOpen.current ? onCloseModal() : onOpenModal()
            }
            style={{ alignItems: "center" }}
          >
            <Animated.View style={rChevronStyle}>
              <Ionicons name={"chevron-up"} size={32} color="black" />
            </Animated.View>
          </Pressable>

          <Text style={{ color: "#CBB59E", marginBottom: 10 }}>
            {dateToLongDateString(calendarContext.selectedDate.get())}
          </Text>

          {calendarContext.selectedDateReminders
            .get()
            .map((reminder, index) => (
              <AnimatedButton key={`Reminder_${index}`}>
                <MenuView
                  actions={[{ title: "Delete" }]}
                  onPressAction={(e) =>
                    calendarContext.deleteReminder(reminder)
                  }
                  shouldOpenOnLongPress
                >
                  <HStack style={{ marginVertical: 10 }}>
                    <Text style={{ flex: 3, fontWeight: "700" }}>
                      {getFormattedTime(reminder.dateTime)}
                    </Text>
                    <VStack style={{ flex: 5 }}>
                      <Text style={{ fontWeight: "700" }}>
                        {reminder.title}
                      </Text>
                      <Text>{reminder.note}</Text>
                    </VStack>
                  </HStack>
                </MenuView>
              </AnimatedButton>
            ))}

          <Link asChild href="/NewReminderScreen">
            <AnimatedButton
              style={{
                backgroundColor: "#CBB59E",
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 9,
                position: "absolute",
                bottom: 60,
                right: 20,
                shadowOffset: {
                  height: 5,
                  width: 0,
                },
                shadowRadius: 5,
                shadowOpacity: 0.3,
              }}
            >
              <Ionicons name="add" size={30} color={"white"} />
            </AnimatedButton>
          </Link>
        </Animated.View>
      </ImageBackground>
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    paddingTop: 3,
    paddingBottom: 8,
    paddingHorizontal: 16,
    width: "100%",
    bottom: 0,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "black",
    shadowOffset: {
      height: -5,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  backgroundImage: {
    flex: 1,
  },
});
