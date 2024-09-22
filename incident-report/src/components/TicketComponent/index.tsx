import React from 'react';
import { format } from "date-fns";
import { Box, Heading, HStack, Text, VStack } from '@components/base';
import { useTheme } from 'styled-components/native';

import DangerCircle from "@assets/icons/bold/Danger Circle.svg";

import * as S from './styles';

const severityColor = {
  "1": "#28a745",
  "2": "#ffc107",
  "3": "#fd7e14",
  "4": "#dc3545",
  "5": "#6c1c2a"
}

interface ITicketComponentProps {
  item: {
    created_at: string;
    evidence: string;
    host: string;
    id: number;
    name: string;
    severity: string;
    updated_at: string;
  }
}

export function TicketComponent({ item }: ITicketComponentProps) {
  const theme = useTheme();

  return (
    <S.Container>
      <HStack
        spacing={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          padding={11}
          borderRadius={100}
          width={46}
          height={46}
          backgroundColor={severityColor[item?.severity]}
        >
          <DangerCircle
            fill={theme?.colors?.white}
          />
        </Box>

        <VStack
          flex={1}
        >
          <Heading
            variant='heading4'
            weight='semibold'
          >
            {item?.name}
          </Heading>

          <Text color={theme?.colors?.placeholder}>
            {item?.host}
          </Text>
        </VStack>

        <Text>
          {format(item?.created_at, "dd/MM/yyy")}
        </Text>
      </HStack>

    </S.Container>
  );
}