import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';

import * as S from './styles';
import { Box, Text, VStack } from '@components/base';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from "expo-image-picker";
import { Image, Modal, StyleSheet } from 'react-native';
import { ChoiceUploadType } from '../ChoiceUploadType';

interface IUploadEvidenceProps {
  onChange: (value: string) => void;
  defaultImage?: string;
};

export function UploadEvidence({ onChange, defaultImage = "" }: IUploadEvidenceProps) {
  const [image, setImage] = useState(defaultImage);
  const [showChoiceModal, setShowChoiceModal] = useState(false);

  const theme = useTheme();

  async function uploadImage(mode: string) {
    try {
      if (mode === "gallery") {
        await ImagePicker?.requestMediaLibraryPermissionsAsync();

        let result = await ImagePicker?.launchImageLibraryAsync({
          mediaTypes: ImagePicker?.MediaTypeOptions?.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });

        if (!result.canceled) {
          await saveImage(result?.assets[0]?.uri);

        }

      } else if (mode === "camera") {
        await ImagePicker.requestCameraPermissionsAsync();

        let result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker?.CameraType?.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1
        });

        if (!result.canceled) {
          await saveImage(result?.assets[0]?.uri);
        }
      } else {
        saveImage(null);
      }


    } catch (error) {
      alert("Error uploading images");
      handleCloseModal();
    }
  }

  async function saveImage(image: string) {
    try {
      setImage(image);
      onChange(image);
      handleCloseModal();
    } catch (error) {
      throw error;
    }
  }

  function handleOpenModal() {
    setShowChoiceModal(true);
  }

  function handleCloseModal() {
    setShowChoiceModal(false);
  }

  return (
    <S.Container onPress={handleOpenModal}>
      <VStack
        spacing={10}
        justifyContent="center"
        alignItems="center"
      >
        <FontAwesome
          name="image"
          size={40}
          color={theme?.colors?.primary}
        />

        <Text
          variant='large'
          color={theme?.colors?.placeholder}
        >
          Escolher evidência
        </Text>
      </VStack>

      {image && (
        <Image
          source={{ uri: image }}
          style={[{ borderRadius: 15 }, StyleSheet.absoluteFillObject]}
        />
      )}

      <ChoiceUploadType
        isVisible={showChoiceModal}
        onClose={handleCloseModal}
        onPress={uploadImage}
      />


    </S.Container>
  );
}