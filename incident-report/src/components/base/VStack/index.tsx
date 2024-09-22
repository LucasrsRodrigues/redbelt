import React from 'react';
import * as S from "./styles";

import { IVStackProps } from './vstack';

export function VStack({ children, ...rest }: IVStackProps) {
  return (
    <S.Container
      {...rest}
    >
      {children}
    </S.Container>
  );
}