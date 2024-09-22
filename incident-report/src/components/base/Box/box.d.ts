import {
  ColorProps,
  SpaceProps,
  LayoutProps,
  BorderProps,
  FlexboxProps,
  PositionProps,
  ShadowProps,
} from 'styled-system';

export interface IBoxProps extends ColorProps,
  SpaceProps,
  LayoutProps,
  BorderProps,
  FlexboxProps,
  PositionProps,
  ShadowProps {
  children?: React.ReactNode;
}
