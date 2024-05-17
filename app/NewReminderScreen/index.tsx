import { useCalendarContext } from "@/CalendarContext";
import { dateToLongDateString } from "@/helpers/dateHelpers";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const newReminderScreen = () => {
  const calendarContext = useCalendarContext();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgroundImage.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.modalContainer}>
          <Text style={{ color: "#CBB59E" }}>
            {dateToLongDateString(calendarContext.selectedDate.get())}
          </Text>

          <View
            style={{
              backgroundColor: "#CBB59E",
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
              paddingHorizontal: 25,
              paddingVertical: 15,
            }}
          >
            <Link href="/NewReminderScreen">
              <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    width: "100%",
    height: "87%",
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

export default newReminderScreen;
