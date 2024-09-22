import {
  ColorProps,
  SpaceProps,
  TypographyProps,
  LayoutProps
} from 'styled-system';
import { TextInputProps } from "react-native";

export default interface ITextProps extends TextInputProps, ColorProps,
  SpaceProps,
  TypographyProps,
  LayoutProps {
  variant?: "large" | "medium" | "small" | "xsmall";
  color?: string;
  weight?: "regular" | "medium" | "semibold" | "bold";
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
  children: string | Array<string>;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
}