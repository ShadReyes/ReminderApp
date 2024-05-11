import { StyleSheet, ImageBackground, View, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const isModalOpen = useRef(false);
  const modalHeight = useSharedValue(60);
  const chevronRotation = useSharedValue(0);

  const onOpenModal = () => {
    isModalOpen.current = true;
    modalHeight.value = withTiming(90);
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
        style={styles.reactLogo}
        resizeMode="cover"
      >
        <Animated.View style={[rModalContainerStyle, styles.modalContainer]}>
          <Pressable
            onPress={() =>
              isModalOpen.current ? onCloseModal() : onOpenModal()
            }
            style={{ alignItems: "center" }}
          >
            <Animated.View style={rChevronStyle}>
              <Ionicons
                name={isModalOpen.current ? "chevron-down" : "chevron-up"}
                size={32}
                color="black"
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    width: "100%",
    bottom: 0,
    // backgroundColor: "#d2d6d6",
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
  reactLogo: {
    flex: 1,
  },
});
