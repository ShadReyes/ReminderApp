import { ColorValue, View } from "react-native";

interface ILineDividerProps {
  color?: ColorValue;
  marginVertical?: number;
}
export const LineDivider = (props: ILineDividerProps) => {
  return (
    <View
      style={{
        borderBottomColor: props.color ?? "white",
        borderBottomWidth: 1,
        marginVertical: props.marginVertical,
      }}
    />
  );
};
