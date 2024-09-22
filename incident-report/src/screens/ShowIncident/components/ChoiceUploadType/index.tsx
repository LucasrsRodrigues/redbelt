import React from 'react';

import * as S from './styles';
import { Modal } from 'react-native';
import { Box, Heading, HStack, Text, VStack } from '@components/base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTheme } from 'styled-components/native';
import Entypo from '@expo/vector-icons/Entypo';

interface IChoiceUploadTypeProps {
  isVisible: boolean;
  onPress: (type: string) => void;
  onClose: () => void;
}

export function ChoiceUploadType({ isVisible, onPress, onClose }: IChoiceUploadTypeProps) {
  const theme = useTheme();

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType='fade'
    >
      <S.Overlay
        onPress={onClose}
      >
        <Box
          backgroundColor={theme?.colors?.background}
          padding={20}
          borderRadius={12}
        >

          <VStack spacing={10} alignItems="center">
            <Heading
              variant="heading3"
            >
              Upload de Evidência
            </Heading>

            <HStack spacing={20}>
              <S.ChoiceButton onPress={() => onPress("camera")}>
                <Entypo name="camera" size={24} color={theme?.colors?.primary} />

                <Text
                  variant='large'
                  color={theme?.colors?.white}
                >
                  Câmera
                </Text>
              </S.ChoiceButton>
              <S.ChoiceButton onPress={() => onPress("gallery")}>
                <Entypo name="folder-images" size={24} color={theme?.colors?.primary} />

                <Text
                  variant='large'
                  color={theme?.colors?.white}
                >
                  Galeria
                </Text>
              </S.ChoiceButton>
              <S.ChoiceButton onPress={() => onPress("remove")}>
                <Entypo name="trash" size={24} color={theme?.colors?.primary} />

                <Text
                  variant='large'
                  color={theme?.colors?.white}
                >
                  Excluir
                </Text>
              </S.ChoiceButton>
            </HStack>
          </VStack>

        </Box>
      </S.Overlay>
    </Modal>
  );
}