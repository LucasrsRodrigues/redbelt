import React from 'react';
import * as S from './styles';
import { IBoxProps } from './box';


export function Box({ children, ...rest }: IBoxProps) {
  return (
    <S.Container {...rest}>
      {children}
    </S.Container>
  );
}