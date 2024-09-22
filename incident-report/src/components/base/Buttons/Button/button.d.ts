import { TouchableOpacityProps } from "react-native";
import { BorderProps, ColorProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps } from "styled-system";

export interface IButtonProps extends TouchableOpacityProps,
  IRNButtonProps,
  ColorProps,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  PositionProps {
  label: string;
  tintColor?: string;
  isLoading?: boolean;
  size?: "small" | "medium" | "big" | "outline";
  color?: "black" | "main";
  type?: "outline" | "default";
}