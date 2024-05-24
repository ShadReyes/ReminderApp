import { useCalendarContext } from "@/CalendarContext";
import { AnimatedButton } from "@/components/AnimatedButton";
import { HStack } from "@/components/HStack";
import { LineDivider } from "@/components/LineDivider";
import { MarginDivider } from "@/components/MarginDivider";
import { dateToLongDateString } from "@/helpers/dateHelpers";
import { IReminder } from "@/models/Reminder";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useRef } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const newReminderScreen = () => {
  const calendarContext = useCalendarContext();

  const formData = useRef<IReminder>({
    title: "",
    note: "",
    dateTime: new Date(
      calendarContext.selectedDate.get().getFullYear(),
      calendarContext.selectedDate.get().getMonth(),
      calendarContext.selectedDate.get().getDate(),
      new Date().getHours(),
      new Date().getMinutes()
    ),
  });

  const onSaveReminder = () => {
    calendarContext.saveReminder(formData.current);
    router.back();
  };

  const setDate = (date: Date | undefined) => {
    if (!date) return;

    formData.current.dateTime.setFullYear(date.getFullYear());
    formData.current.dateTime.setMonth(date.getMonth());
    formData.current.dateTime.setDate(date.getDate());
  };

  const setTime = (time: Date | undefined) => {
    if (!time) return;
    formData.current.dateTime.setHours(time.getHours());
    formData.current.dateTime.setMinutes(time.getMinutes());
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("@/assets/images/backgroundImage.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.modalContainer}>
          <Text style={{ color: "#CBB59E", textAlign: "center", fontSize: 20 }}>
            New Reminder
          </Text>

          <MarginDivider margin={20} />
          <Text style={styles.inputTitle}>Title</Text>
          <MarginDivider margin={10} />
          <TextInput
            style={styles.inputTextStyle}
            onChange={(e) => (formData.current.title = e.nativeEvent.text)}
          />
          <LineDivider opacity={0.2} color="grey" />
          <MarginDivider margin={25} />
          <Text style={styles.inputTitle}>Note</Text>
          <MarginDivider margin={10} />
          <TextInput
            style={styles.inputTextStyle}
            onChange={(e) => (formData.current.note = e.nativeEvent.text)}
          />
          <LineDivider opacity={0.2} color="grey" />
          <MarginDivider margin={20} />
          <HStack
            style={{
              alignItems: "center",
            }}
          >
            <Text style={styles.inputTitle}>Date:</Text>
            <RNDateTimePicker
              style={{}}
              mode="date"
              value={calendarContext.selectedDate.peek()}
              minuteInterval={5}
              onChange={(event, date) =>
                event.type.toString() === "set" ? setDate(date) : null
              }
            />
          </HStack>
          <MarginDivider margin={20} />
          <HStack
            style={{
              alignItems: "center",
            }}
          >
            <Text style={styles.inputTitle}>Time:</Text>
            <RNDateTimePicker
              style={{}}
              mode="time"
              value={new Date()}
              minuteInterval={5}
              onChange={(event, date) =>
                event.type.toString() === "set" ? setTime(date) : null
              }
            />
          </HStack>

          <AnimatedButton
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
            onPress={onSaveReminder}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Save</Text>
          </AnimatedButton>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    paddingTop: 20,
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
  backgroundImage: {
    flex: 1,
  },
  inputTitle: {
    fontSize: 16,
    color: "grey",
  },
  inputTextStyle: {
    fontSize: 18,
    color: "black",
  },
});

export default newReminderScreen;
