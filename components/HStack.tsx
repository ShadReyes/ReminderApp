import { View, ViewProps } from "react-native";

interface IHStackProps extends ViewProps {}

export function HStack(props: IHStackProps) {
  const { style, ...otherProps } = props;
  return (
    <View {...otherProps} style={[style, { flexDirection: "row" }]}>
      {props.children}
    </View>
  );
}
