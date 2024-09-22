import React from 'react';

import { useTheme } from 'styled-components';
import { SelectList, SelectListProps } from 'react-native-dropdown-select-list';
import { VStack } from '@components/base/VStack';

import SearchIcon from "@assets/icons/outline/Search 2.svg";
import DownIcon from "@assets/icons/outline/Down 2.svg";
import CloseIcon from "@assets/icons/outline/Close.svg";
import { Text } from '@components/base/Typography/Text';


interface ISelectProps extends SelectListProps {
  data: {}[];
  setSelected: Function;
  label: string;
}

export function Select({ data, label, setSelected, ...rest }: ISelectProps) {
  const theme = useTheme();

  return (
    <VStack spacing={10}>
      <Text weight='bold'>
        {label}
      </Text>

      <SelectList
        setSelected={setSelected}
        data={data}
        save="key"
        boxStyles={{
          backgroundColor: theme?.colors?.shape,
          borderColor: theme?.colors?.shape,
        }}
        inputStyles={{
          color: theme.colors.white
        }}
        dropdownStyles={{
          backgroundColor: theme?.colors?.shape,
          borderColor: theme?.colors?.shape,
        }}
        dropdownTextStyles={{
          color: theme.colors.heading
        }}
        searchicon={<SearchIcon fill={theme?.colors?.placeholder} />}
        arrowicon={<DownIcon fill={theme?.colors?.placeholder} />}
        closeicon={<CloseIcon fill={theme?.colors?.placeholder} />}
        placeholder='Selecione'
        {...rest}
      />
    </VStack>
  );
}