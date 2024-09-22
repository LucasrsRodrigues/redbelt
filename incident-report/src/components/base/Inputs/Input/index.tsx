import React, { ReactNode } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components/native';

import { VStack, Text } from '@components/base';
import DangerCircle from "@assets/icons/outline/Danger Circle.svg";

import * as S from './styles';

export interface IInputProps extends TextInputProps {
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
}

export function Input({
  label,
  leftElement,
  rightElement,
  error = "",
  ...rest }: IInputProps) {
  const theme = useTheme();

  return (
    <VStack spacing={10}>
      {label && (
        <Text weight='bold'>
          {label}
        </Text>
      )}

      <S.WrapperInputIcon
        error={!!error}
      >
        {leftElement && leftElement}

        <S.Input
          {...rest}
        />

        {rightElement && rightElement}
      </S.WrapperInputIcon>

      {error && (
        <S.InputErrorContainer>
          <DangerCircle
            fill={theme?.colors?.error}
          />

          <Text
            variant='medium'
            color={theme?.colors?.error}
          >
            {error}
          </Text>
        </S.InputErrorContainer>
      )}
    </VStack>
  );
}