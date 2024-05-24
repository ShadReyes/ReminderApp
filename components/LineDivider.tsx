import { ColorValue, View } from "react-native";

interface ILineDividerProps {
  color?: ColorValue;
  marginVertical?: number;
  opacity?: number;
}
export const LineDivider = (props: ILineDividerProps) => {
  return (
    <View
      style={{
        borderBottomColor: props.color ?? "white",
        borderBottomWidth: 1,
        marginVertical: props.marginVertical,
        opacity: props.opacity ?? 1,
      }}
    />
  );
};
