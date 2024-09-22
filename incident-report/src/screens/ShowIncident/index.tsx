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
import { useNavigation, useRoute } from '@react-navigation/native';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  host: Yup.string().url().required()
});

export function ShowIncident() {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const item = params?.item;

  const [selected, setSelected] = useState("");
  const [evidence, setEvidence] = useState("");

  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },

  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      host: item?.host,
      name: item?.name
    }
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

  async function deleteIncident() {
    try {
      setLoading(true);
      await IncidentHTTPService.delete(item?.id);

      Toast.show({
        type: 'success',
        text1: "Ocorrência cancelada com sucesso!",
      });

      goBack();

    } catch (error) {
      const message = error?.response?.data?.error;

      Toast.show({
        type: 'error',
        text1: message,
      });
    } finally {
      setLoading(false);
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
          #{item?.id} {item?.name}
        </Heading>
      </HStack>

      <VStack
        spacing={24}
        marginTop={hp(5)}
        paddingX={20}
      >
        <UploadEvidence
          onChange={setEvidence}
          defaultImage={`http://127.0.0.1:8000/storage/${item?.evidence}`}
        />

        <ControlledInput
          control={control}
          name="name"
          label='Titulo'
          placeholder='Titulo da evidencia'
          error={errors?.name?.message}
          editable={false}
        />

        <Select
          label="Criticidade"
          data={data}
          setSelected={setSelected}
          defaultOption={data?.filter(item => item.key === item?.severity)[0]}

        />

        <ControlledInput
          control={control}
          name="host"
          label='Host'
          placeholder='ex: https://www.host.com'
          error={errors?.host?.message}
          editable={false}
        />
        {editable ? (
          <Button
            label='Registrar'
            onPress={handleSubmit(submit)}
            isLoading={isSubmitting}
          />
        ) : (
          <Button
            label='Cancelar ocorrência'
            onPress={deleteIncident}
            isLoading={loading}
            backgroundColor={theme?.colors?.error}
          />
        )}

      </VStack>
    </Box>
  );
}