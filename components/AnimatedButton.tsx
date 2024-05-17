import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
} from "react-native";

interface IAnimatedButtonProps extends PressableProps {}

export const AnimatedButton = (props: IAnimatedButtonProps) => {
  const onPressAnimation = ({ pressed }: PressableStateCallbackType) => {
    return [
      {
        opacity: pressed ? 0.5 : 1,
      },
      props.style,
    ] as any;
  };
  return (
    <Pressable style={onPressAnimation} {...props}>
      {props.children}
    </Pressable>
  );
};
