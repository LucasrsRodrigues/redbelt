import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';


import * as S from './styles';

interface IIconButtonProps extends TouchableOpacity {
  icon: ReactNode;
}

export function IconButton({ icon, ...rest }: IIconButtonProps) {
  return (
    <S.Container {...rest}>
      {icon}
    </S.Container>
  );
}