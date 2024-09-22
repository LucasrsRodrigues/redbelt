import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps
} from "styled-system";

export default interface IHStackProps extends ColorProps,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  BorderProps,
  PositionProps {
  children: ReactNode;
  spacing?: number;

}

