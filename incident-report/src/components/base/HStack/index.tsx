import React, { ReactNode } from 'react';

import * as S from './styles';
import IHStackProps from './hstack';


export function HStack({ children, ...rest }: IHStackProps) {
  return (
    <S.Container
      {...rest}
    >
      {children}
    </S.Container>
  );
}