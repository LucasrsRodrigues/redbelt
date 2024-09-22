import responsiveFontSize from "@utils/responsiveFontSize";
import styled, { css } from "styled-components/native";
import { DefaultTheme } from "styled-components/native/dist/types";

const variants = (theme: DefaultTheme, variants = 'heading1') => ({
  "heading1": css`
    font-size: ${responsiveFontSize(30)}px;
    line-height: ${responsiveFontSize(39.6)}px;
  `,
  "heading2": css`
    font-size: ${responsiveFontSize(24)}px;
    line-height: ${responsiveFontSize(32.4)}px;
  `,
  "heading3": css`
    font-size: ${responsiveFontSize(20)}px;
    line-height: ${responsiveFontSize(26)}px;
  `,
  "heading4": css`
    font-size: ${responsiveFontSize(18)}px;
    line-height: ${responsiveFontSize(25.2)}px;
  `,
}[variants]);

export default interface IRNHeadingProps {
  variant?: "heading1" | "heading2" | "heading3" | "heading4";
  color?: string;
  weight?: "regular" | "medium" | "semibold" | "bold";
  textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent";
}

export const HeadingContainer = styled.Text<IRNHeadingProps>`
  ${({ theme, variant }) => variants(theme, variant)};

  color: ${({ color }) => color};

  font-family: ${({ theme, weight }) => theme.fonts[weight!]};
  text-align: ${({ textAlign }) => textAlign};
`;