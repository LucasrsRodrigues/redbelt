import styled from "styled-components/native";
import { IBoxProps } from "./box";

import {
  color,
  space,
  layout,
  border,
  flexbox,
  position,
  shadow,
} from 'styled-system';

export const Container = styled.View<IBoxProps>`
  ${color};
  ${space};
  ${layout};
  ${border};
  ${flexbox};
  ${position};
  ${shadow};
`;