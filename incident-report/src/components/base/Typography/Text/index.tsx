import React from 'react';

import ITextProps from './text';

import * as S from './styles';

export function Text({
  children,
  variant = "medium",
  color = "#FFFFFF",
  weight = "medium",
  textTransform = "none",
  ...rest
}: ITextProps) {
  return (
    <S.TextContainer
      variant={variant}
      color={color}
      weight={weight}
      textTransform={textTransform}
      {...rest}
    >
      {children}
    </S.TextContainer>
  );
}