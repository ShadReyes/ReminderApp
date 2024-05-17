import {
  StyleSheet,
  ImageBackground,
  View,
  Pressable,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { months, weekDays } from "@/constants/Dates";
import { useCalendarContext } from "@/CalendarContext";
import { dateToLongDateString } from "@/helpers/dateHelpers";
import { observer } from "@legendapp/state/react";
import { Calendar } from "@/components/Calendar";

const HomeScreen = observer(() => {
  const calendarContext = useCalendarContext();

  const isModalOpen = useRef(false);
  const modalHeight = useSharedValue(60);
  const chevronRotation = useSharedValue(0);

  const safeArea = useSafeAreaInsets();

  const onOpenModal = () => {
    isModalOpen.current = true;
    modalHeight.value = withTiming(95);
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
        style={styles.backgroundImage}
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

          <Text style={{ color: "#CBB59E" }}>
            {dateToLongDateString(calendarContext.selectedDate.get())}
          </Text>

          <Pressable
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
          </Pressable>
        </Animated.View>
      </ImageBackground>
    </View>
  );
});

export default HomeScreen;

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    paddingTop: 8,
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  backgroundImage: {
    flex: 1,
  },
});
