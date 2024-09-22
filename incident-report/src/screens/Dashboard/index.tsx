import React, { useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';

import { useTheme } from 'styled-components/native';

import SearchIcon from "@assets/icons/outline/Search 2.svg";
import LogoutIcon from "@assets/icons/bold/Logout.svg";
import PlusIcon from "@assets/icons/bold/Add.svg";

import IncidentHTTPService from '@services/infrastructure/service/IncidentHTTPService';
import { Box, Button, Heading, HStack, Input } from '@components/base';
import { TicketComponent } from '@components/TicketComponent';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAuth } from '@hooks/auth';
import { IconButton } from '@components/base/Buttons/IconButton';
import { useNavigation } from '@react-navigation/native';


interface ITicketsProps {
  created_at: string;
  evidence: string;
  host: string;
  name: string;
  severity: string;
  updated_at: string;
  id: number;
}

export function Dashboard() {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const { signOut } = useAuth();
  const [tickets, setTickets] = useState<Array<ITicketsProps>>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await IncidentHTTPService.list();
        setTickets(response.data);
      } catch (error) {
        console.error(error?.response?.data?.message)
      }
    })();
  }, []);


  return (
    <Box
      flex={1}
      backgroundColor={theme?.colors?.background}
      paddingY={70}
    >

      <HStack
        justifyContent="center"
        borderBottomColor={theme?.colors?.placeholder}
        borderBottomWidth={1}
        paddingX={20}
        position="relative"
      >
        <Heading>
          Ticket List
        </Heading>

        <Box
          position="absolute"
          right={wp(5)}
        >
          <Pressable onPress={signOut}>
            <LogoutIcon
              fill={theme?.colors?.error}
            />
          </Pressable>
        </Box>
      </HStack>

      <Box
        padding={20}
      >
        <Input
          leftElement={<SearchIcon fill={theme?.colors?.placeholder} />}
          placeholder='Search Ticket'
        />
      </Box>

      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <TicketComponent item={item} />
        )}
        ItemSeparatorComponent={() => (
          <Box height={10} />
        )}
      />

      <IconButton
        onPress={() => navigate("RegisterIncident")}
        icon={<PlusIcon stroke={theme?.colors?.background} fill={theme?.colors?.background} />}
      />
    </Box>
  );
}