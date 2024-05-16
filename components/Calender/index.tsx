import { Text, View } from "react-native";
import { HStack } from "../HStack";
import { CalenderGrid } from "./CalenderGrid";
import { months, nDays, weekDays } from "@/constants/Dates";
import { useCalenderContext } from "@/CalenderContext";

export const Calendar = () => {
  const {
    currentYear,
    currentMonth,
    selectedDate,
    setSelectedDate,
    currentFirstDay,
  } = useCalenderContext();

  return (
    <View style={{ alignContent: "center" }}>
      <Text
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        {months[currentMonth]}
      </Text>
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
        numberOfDays={nDays[currentMonth]}
        firstDayOfMonth={currentFirstDay}
        prevMonthLastDay={nDays[(currentMonth - 1) % 12]}
        selectedMonth={currentMonth}
        selectedYear={currentYear}
        selectedDate={selectedDate}
        setSelectedDate={(date: Date) => setSelectedDate(date)}
      />
    </View>
  );
};
