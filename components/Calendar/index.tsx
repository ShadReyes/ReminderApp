import { Pressable, Text, View } from "react-native";
import { HStack } from "../HStack";
import { CalendarGrid } from "./CalendarGrid";
import { months, nDays, weekDays } from "@/constants/Dates";
import { useCalendarContext } from "@/CalendarContext";
import { Ionicons } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { observer } from "@legendapp/state/react";
import { LineDivider } from "../LineDivider";

export const Calendar = observer(() => {
  const calendarContext = useCalendarContext();

  return (
    <View style={{ alignContent: "center" }}>
      <HStack style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            color: "white",
            fontWeight: "500",
            fontSize: 30,
            textAlign: "center",
            marginRight: 10,
          }}
        >
          {months[calendarContext.selectedMonth.get()]}
        </Text>
        <MenuView
          actions={Array.from({ length: 50 }, (_, i) => i + 2000).map(
            (year) => {
              return { title: year.toString() };
            }
          )}
          onPressAction={(e) =>
            calendarContext.selectedYear.set(Number(e.nativeEvent.event))
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {calendarContext.selectedYear.get()}
          </Text>
          <Ionicons name="chevron-down" size={20} color="white" />
        </MenuView>
      </HStack>
      <HStack style={{ justifyContent: "space-between" }}>
        {weekDays.map((day, index) => (
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "white",
              width: `${100 / 7}%`,
              fontWeight: "500",
            }}
            key={`${day}_${index}`}
          >
            {day[0]}
          </Text>
        ))}
      </HStack>
      <LineDivider marginVertical={10} />
      <CalendarGrid
        numberOfDays={nDays[calendarContext.selectedMonth.get()]}
        firstDayOfMonth={calendarContext.currentFirstDay.get()}
        prevMonthLastDay={nDays[(calendarContext.selectedMonth.get() - 1) % 12]}
        selectedMonth={calendarContext.selectedMonth.get()}
        selectedYear={calendarContext.selectedYear.get()}
        selectedDate={calendarContext.selectedDate.get()}
        setSelectedDate={(date: Date) => calendarContext.selectedDate.set(date)}
      />
    </View>
  );
});
