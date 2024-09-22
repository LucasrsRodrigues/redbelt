import styled, { css } from "styled-components/native";
import { DefaultTheme } from "styled-components/native/dist/types";
import IRNTextProps from "./text";
import { color, layout, space, typography } from "styled-system";
import responsiveFontSize from "@utils/responsiveFontSize";

const variants = (theme: DefaultTheme, variants = 'medium') => ({
  "large": css`
    font-size: ${responsiveFontSize(16)}px;
    line-height: ${responsiveFontSize(22.4)}px;
  `,
  "medium": css`
    font-size: ${responsiveFontSize(14)}px;
    line-height: ${responsiveFontSize(19.6)}px;
  `,
  "small": css`
    font-size: ${responsiveFontSize(12)}px;
    line-height: ${responsiveFontSize(18)}px;
  `,
  "xsmall": css`
    font-size: ${responsiveFontSize(8)}px;
    line-height: ${responsiveFontSize(12)}px;
  `,
}[variants]);

export const TextContainer = styled.Text<IRNTextProps>`
  ${color};
  ${space};
  ${typography};
  ${layout};

  ${({ theme, variant }) => variants(theme, variant)};
  font-family: ${({ theme, weight }) => theme.fonts[weight!]};
  text-align: ${({ textAlign }) => textAlign};
  text-transform: ${({ textTransform }) => textTransform};
`;