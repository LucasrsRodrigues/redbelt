import React, { useEffect, useState } from 'react';
import { FlatList, Pressable } from 'react-native';

import { useTheme } from 'styled-components/native';

import SearchIcon from "@assets/icons/outline/Search 2.svg";
import LogoutIcon from "@assets/icons/bold/Logout.svg";
import PlusIcon from "@assets/icons/bold/Add.svg";

import IncidentHTTPService from '@services/infrastructure/service/IncidentHTTPService';
import { Box, Button, Heading, HStack, Input, Text, VStack } from '@components/base';
import { TicketComponent } from '@components/TicketComponent';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAuth } from '@hooks/auth';
import { IconButton } from '@components/base/Buttons/IconButton';
import { useNavigation } from '@react-navigation/native';
import { ShimmerTicketComponent } from '@components/shimmer/TicketComponent';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ITicketsProps {
  created_at: string;
  evidence: string;
  host: string;
  name: string;
  severity: string;
  updated_at: string;
  id: number;
}

function TicketIsEmpty() {
  const theme = useTheme();

  return (
    <Box flex={1} alignItems="center">
      <VStack alignItems="center" spacing={10}>
        <MaterialIcons
          name="report-off"
          size={100}
          color={theme?.colors?.primary}
        />

        <Heading variant='heading3'>
          Sem Incidentes reportados.
        </Heading>
      </VStack>
    </Box>
  )
}

export function Dashboard() {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const { signOut } = useAuth();

  const [tickets, setTickets] = useState<Array<ITicketsProps>>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await IncidentHTTPService.list();
        setTickets(response.data);
      } catch (error) {
        console.error(error?.response?.data?.message)
      } finally {
        setIsLoading(false);
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
          Incidentes
        </Heading>

        <Box
          position="absolute"
          right={wp(5)}
        >
          <Pressable onPress={signOut}>
            <LogoutIcon
              fill={theme?.colors?.primary}
            />
          </Pressable>
        </Box>
      </HStack>

      <Box
        padding={20}
      >
        <Input
          leftElement={<SearchIcon fill={theme?.colors?.placeholder} />}
          placeholder='Procurar incidente'
        />
      </Box>


      <Box
        padding={10}
      />

      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <TicketComponent item={item} />
        )}
        ItemSeparatorComponent={() => (
          <Box height={10} />
        )}
        ListEmptyComponent={isLoading ? <ShimmerTicketComponent /> : <TicketIsEmpty />}
      />


      <IconButton
        onPress={() => navigate("RegisterIncident")}
        icon={<PlusIcon stroke={theme?.colors?.background} fill={theme?.colors?.background} />}
      />
    </Box>
  );
}