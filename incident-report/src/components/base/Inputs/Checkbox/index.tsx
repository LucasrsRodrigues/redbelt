import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import TickIcon from "@assets/icons/outline/Tick.svg";


import { widthPercentageToDP } from 'react-native-responsive-screen';

import * as S from './styles';

interface ICheckboxProps extends TouchableOpacityProps {
  isChecked: boolean;
}


export function Checkbox({ isChecked, ...rest }: ICheckboxProps) {
  return (
    <S.CheckboxContainer
      isCheked={isChecked}
      {...rest}
    >
      {isChecked && (
        <TickIcon
          fill="#ffffff"
          width={widthPercentageToDP(3.47)}
          height={widthPercentageToDP(3.47)}
        />
      )}

    </S.CheckboxContainer>
  );
}