import styled from "styled-components/native";
import { border, color, flexbox, layout, position, space } from "styled-system";
import { IVStackProps } from "./vstack";

export const Container = styled.View<IVStackProps>`
  flex-direction: column;

  ${color}
  ${space}
  ${layout}
  ${flexbox}
  ${border}
  ${position}

  gap: ${({ spacing }) => spacing}px;

`;