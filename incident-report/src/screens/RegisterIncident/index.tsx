import { Box, Button, Heading, HStack, Text, VStack } from '@components/base';
import { Select } from '@components/base/Inputs/Select';
import { ControlledInput } from '@components/ControlledInput';
import { yupResolver } from '@hookform/resolvers/yup';
import IncidentHTTPService from '@services/infrastructure/service/IncidentHTTPService';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { useTheme } from 'styled-components/native';
import * as Yup from "yup";

import { UploadEvidence } from './components/UploadEvidence';
import { Platform } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { useNavigation } from '@react-navigation/native';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  host: Yup.string().url().required()
});

export function RegisterIncident() {
  const theme = useTheme();
  const { goBack } = useNavigation();

  const [selected, setSelected] = useState("");
  const [evidence, setEvidence] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const data = [
    { key: '1', value: 'Nível 1 (Baixa)' },
    { key: '2', value: 'Nível 2 (Moderada)' },
    { key: '3', value: 'Nível 3 (Alta)' },
    { key: '4', value: 'Nível 4 (Crítica)' },
    { key: '5', value: 'Nível 5 (Muito Crítica)' },
  ];

  async function submit(data) {
    try {
      if (selected === "") {
        return;
      }

      if (evidence === "") {
        return;
      }

      const dataSend = new FormData();


      const evidenceManipulate = await manipulateAsync(
        evidence,
        [{ resize: { width: 800 } }],
        { compress: 1, format: SaveFormat.JPEG },
      );

      dataSend.append("name", data?.name);

      dataSend.append("evidence", {
        uri: evidenceManipulate.uri,
        type: "image/jpg",
        name: "evidence.jpg"
      });

      dataSend.append("severity", selected);
      dataSend.append("host", data?.host);

      const response = await IncidentHTTPService.create(dataSend);

      if (response?.data?.error) {
        Toast.show({
          type: 'error',
          text1: response?.data?.error,
        });

        return;
      }

      Toast.show({
        type: 'success',
        text1: "Incidente cadastrado com sucesso!",
      });

      goBack();

    } catch (error) {
      const message = error?.response?.data?.error;

      Toast.show({
        type: 'error',
        text1: message,
      });
    }
  }

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
      >
        <Heading>
          Novo Incidente
        </Heading>
      </HStack>

      <VStack
        spacing={24}
        marginTop={hp(5)}
        paddingX={20}
      >
        <UploadEvidence
          onChange={setEvidence}
        />

        <ControlledInput
          control={control}
          name="name"
          label='Titulo'
          placeholder='Titulo da evidencia'
          error={errors?.name?.message}
        />

        <Select
          label="Criticidade"
          data={data}
          setSelected={setSelected}
        />

        <ControlledInput
          control={control}
          name="host"
          label='Host'
          placeholder='ex: https://www.host.com'
          error={errors?.host?.message}
        />

        <Button
          label='Registrar'
          onPress={handleSubmit(submit)}
          isLoading={isSubmitting}
        />
      </VStack>
    </Box>
  );
}