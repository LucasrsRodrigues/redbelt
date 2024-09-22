import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { IInputProps, Input } from '@components/base';
import { TextInputProps } from 'react-native';


interface IControlledInputProps extends TextInputProps {
  control: Control<FieldValues>;
  name: string;
}

export function ControlledInput({ name, control, ...rest }: IControlledInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          {...rest}
        />
      )}
    />
  );
}