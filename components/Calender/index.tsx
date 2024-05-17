import { Pressable, Text, View } from "react-native";
import { HStack } from "../HStack";
import { CalenderGrid } from "./CalenderGrid";
import { months, nDays, weekDays } from "@/constants/Dates";
import { useCalenderContext } from "@/CalenderContext";
import { Ionicons } from "@expo/vector-icons";
import { MenuView } from "@react-native-menu/menu";
import { observer } from "@legendapp/state/react";

export const Calendar = observer(() => {
  const calenderContext = useCalenderContext();

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
          {months[calenderContext.selectedMonth.get()]}
        </Text>
        <MenuView
          actions={Array.from({ length: 50 }, (_, i) => i + 2000).map(
            (year) => {
              return { title: year.toString() };
            }
          )}
          onPressAction={(e) =>
            calenderContext.selectedYear.set(Number(e.nativeEvent.event))
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>
            {calenderContext.selectedYear.get()}
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
      <View
        style={{
          borderBottomColor: "white",
          borderBottomWidth: 1,
          marginVertical: 10,
        }}
      />
      <CalenderGrid
        numberOfDays={nDays[calenderContext.selectedMonth.get()]}
        firstDayOfMonth={calenderContext.currentFirstDay.get()}
        prevMonthLastDay={nDays[(calenderContext.selectedMonth.get() - 1) % 12]}
        selectedMonth={calenderContext.selectedMonth.get()}
        selectedYear={calenderContext.selectedYear.get()}
        selectedDate={calenderContext.selectedDate.get()}
        setSelectedDate={(date: Date) => calenderContext.selectedDate.set(date)}
      />
    </View>
  );
});
