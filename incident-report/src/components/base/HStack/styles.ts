import styled from "styled-components/native";
import { border, color, flexbox, layout, position, space } from "styled-system";
import IHStackProps from "./hstack";


export const Container = styled.View<IHStackProps>`
  flex-direction: row;
  align-items: center;
  
  gap: ${({ spacing }) => spacing}px;

  ${border}
  ${color}
  ${flexbox}
  ${layout}
  ${position}
  ${space}
`;