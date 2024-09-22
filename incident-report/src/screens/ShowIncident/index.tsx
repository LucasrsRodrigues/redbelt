import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from 'styled-components/native';
import { Platform, Pressable } from 'react-native';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

import Toast from 'react-native-toast-message';

import { Box, Button, Heading, HStack, Text, VStack } from '@components/base';
import { Select } from '@components/base/Inputs/Select';
import { ControlledInput } from '@components/ControlledInput';

import { yupResolver } from '@hookform/resolvers/yup';

import IncidentHTTPService from '@services/infrastructure/service/IncidentHTTPService';

import { UploadEvidence } from './components/UploadEvidence';
import { useNavigation, useRoute } from '@react-navigation/native';

import GobackIcon from "@assets/icons/bold/Left 2.svg";
import EditIcon from "@assets/icons/bold/Edit 2.svg"

import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string().required(),
  host: Yup.string().url().required()
});

export function ShowIncident() {
  const theme = useTheme();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const item = params?.item;

  const [selected, setSelected] = useState(item?.severity);
  const [evidence, setEvidence] = useState(item?.evidence);

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

      if (item?.evidence !== evidence) {
        const evidenceManipulate = await manipulateAsync(
          evidence,
          [{ resize: { width: 800 } }],
          { compress: 1, format: SaveFormat.JPEG },
        );

        dataSend.append("evidence", {
          uri: evidenceManipulate.uri,
          type: "image/jpg",
          name: "evidence.jpg"
        });
      }

      dataSend.append("name", data?.name);

      dataSend.append("severity", selected);
      dataSend.append("host", data?.host);

      const response = await IncidentHTTPService.update(item?.id, dataSend);

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
      console.log(error)
      console.log(error?.response?.data?.message)
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
        justifyContent="space-between"
        alignItems="center"
        borderBottomColor={theme?.colors?.placeholder}
        borderBottomWidth={1}
        paddingX={20}
      >
        <Pressable onPress={goBack}>
          <GobackIcon fill={theme?.colors?.white} />
        </Pressable>

        <Heading>
          #{item?.id} {item?.name}
        </Heading>

        <Pressable onPress={() => setEditable(prev => !prev)}>
          <EditIcon fill={editable ? theme?.colors?.primary : theme?.colors?.white} />
        </Pressable>
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
          editable={editable}
        />

        <Select
          label="Criticidade"
          data={data}
          setSelected={setSelected}
          defaultOption={data?.filter(fitem => fitem.key === item?.severity)[0]}

        />

        <ControlledInput
          control={control}
          name="host"
          label='Host'
          placeholder='ex: https://www.host.com'
          error={errors?.host?.message}
          editable={editable}
        />

        {editable ? (
          <Button
            label='Alterar'
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