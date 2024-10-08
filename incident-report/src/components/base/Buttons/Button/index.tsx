import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Text } from '@components/base/Typography/Text';

import IRNButtonProps, * as S from './styles';

interface IButtonProps extends TouchableOpacityProps, IRNButtonProps {
  label: string;
  tintColor?: string;
  isLoading?: boolean;
}

export function Button({
  label,
  size = "medium",
  color = "main",
  type = "default",
  tintColor = "#040404",
  isLoading = false,
  ...rest
}: IButtonProps) {
  const theme = useTheme();

  return (
    <S.Button
      size={size}
      color={color}
      type={type}
      {...rest}
    >

      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={theme?.colors?.placeholder}
        />
      ) : (
        <Text
          variant='large'
          weight='medium'
          color={rest.disabled ? theme.colors.placeholder : tintColor}
          textAlign="center"
        >
          {label}
        </Text>
      )}

    </S.Button>
  );
}