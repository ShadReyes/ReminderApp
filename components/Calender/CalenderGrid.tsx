import { Pressable, Text, View } from "react-native";

interface ICalenderGridProps {
  numberOfDays: number;
  firstDayOfMonth: number;
  prevMonthLastDay: number;
  selectedMonth: number;
  selectedYear: number;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const CalenderGrid = (props: ICalenderGridProps) => {
  return (
    <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
      {Array.from({ length: props.firstDayOfMonth }, (_, i) => i + 1).map(
        (day, index) => (
          <CalenderGridItem
            key={`prev-month-${day}`}
            value={props.prevMonthLastDay - (props.firstDayOfMonth - index - 1)}
            textColor="gray"
            isSelected={false}
          />
        )
      )}
      {Array.from({ length: props.numberOfDays }, (_, i) => i + 1).map(
        (day) => (
          <CalenderGridItem
            key={`prev-month-${day}`}
            value={day}
            isSelected={isSelectedDate(
              props.selectedDate,
              props.selectedYear,
              props.selectedMonth,
              day
            )}
            setSelectedDate={() =>
              props.setSelectedDate(
                new Date(props.selectedYear, props.selectedMonth, day)
              )
            }
          />
        )
      )}
    </View>
  );
};

const isSelectedDate = (
  selectedDate: Date,
  currentYear: number,
  currentMonth: number,
  currentDay: number
): boolean => {
  return (
    selectedDate.getFullYear() === currentYear &&
    selectedDate.getMonth() === currentMonth &&
    selectedDate.getDate() === currentDay
  );
};

interface ICalenderGridItemProps {
  value?: number;
  textColor?: string;
  isSelected: boolean;
  setSelectedDate?: () => void;
}

const CalenderGridItem = (props: ICalenderGridItemProps) => {
  return (
    <View
      style={{
        width: `${100 / 7}%`,
        paddingVertical: 5,
        justifyContent: "center",
      }}
    >
      {props.isSelected && (
        <View
          style={{
            position: "absolute",
            backgroundColor: "#d8c7b6",
            height: 35,
            width: 35,
            borderRadius: 35 / 2,
            justifyContent: "center",
            alignSelf: "center",
          }}
        />
      )}
      <Pressable onPress={props.setSelectedDate}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            color: props.textColor ?? "white",
            fontWeight: "500",
          }}
          key={`grid-item-${props.value}`}
        >
          {props.value}
        </Text>
      </Pressable>
    </View>
  );
};
