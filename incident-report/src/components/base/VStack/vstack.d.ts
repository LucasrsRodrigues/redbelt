import { BorderProps, ColorProps, FlexboxProps, LayoutProps, PositionProps, SpaceProps } from "styled-system";

export interface IVStackProps extends
  ColorProps,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  PositionProps {
  children: ReactNode;
  spacing?: number;
}