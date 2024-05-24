import { DimensionValue, View } from "react-native";

interface IMarginDividerProps {
  margin: DimensionValue;
}

export const MarginDivider = (props: IMarginDividerProps) => {
  return (
    <View style={{ marginStart: props.margin, marginTop: props.margin }} />
  );
};
