import { View, ViewProps } from "react-native";

interface IVStackProps extends ViewProps {}

export function VStack(props: IVStackProps) {
  const { style, ...otherProps } = props;
  return (
    <View {...otherProps} style={[style, { flexDirection: "column" }]}>
      {props.children}
    </View>
  );
}
