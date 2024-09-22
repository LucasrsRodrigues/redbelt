import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '@components/base/Box';
import { Heading } from '@components/base/Typography/Heading';
import { Button, HStack, Input, Text, VStack } from '@components/base';

import { useTheme } from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import EyeIcon from "@assets/icons/bold/Hide.svg";
import { useForm } from 'react-hook-form';
import { ControlledInput } from '@components/ControlledInput';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import UserHTTPService from '@services/infrastructure/service/UserHTTPService';

import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const schema = Yup.object().shape({
  name: Yup.string().required("").min(3),
  email: Yup.string().email("Email inválido").required("Preencha o Email."),
  password: Yup.string().required("Preencha a Senha."),
  password_confirm: Yup.string().required().min(8),
});

export function Register() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const { navigate } = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function submit(data) {
    try {

      const response = await UserHTTPService.register(data);

      console.log(response.data);

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
      paddingX={20}
      paddingY={70}
    >
      <Heading
        weight='bold'
        color={theme?.colors?.heading}
      >
        Sign Up For Free
      </Heading>

      <VStack spacing={24} marginTop={hp(5)}>
        <ControlledInput
          control={control}
          name="name"
          label='Nome'
          placeholder='Digite seu nome'
          error={errors?.name?.message}
        />

        <ControlledInput
          control={control}
          name="email"
          label='Email'
          placeholder='Digite seu melhor e-mail'
          error={errors?.email?.message}
        />

        <ControlledInput
          control={control}
          name="password"
          label='Senha'
          placeholder='Digite sua senha'
          rightElement={<Pressable onPress={() => setShowPassword(prev => !prev)}><EyeIcon fill={showPassword ? theme?.colors?.primary : theme?.colors?.icon} /></Pressable>}
          secureTextEntry={!showPassword}
          error={errors?.password?.message}
        />

        <ControlledInput
          control={control}
          name="password_confirm"
          label='Confirme a senha'
          placeholder='Confirme sua senha'
          rightElement={<Pressable onPress={() => setShowPassword(prev => !prev)}><EyeIcon fill={showPassword ? theme?.colors?.primary : theme?.colors?.icon} /></Pressable>}
          secureTextEntry={!showPassword}
          error={errors?.password_confirm?.message}
        />

        <Button
          label='Sign Up'
          onPress={handleSubmit(submit)}
          isLoading={isSubmitting}
        />
      </VStack>

      <Box
        alignItems="center"
        justifyContent="center"
        alignSelf="center"
        position="absolute"
        bottom={hp(5)}
      >
        <HStack
          spacing={5}
        >
          <Text>Already have an account?</Text>

          <Button
            label='Sign In'
            type='outline'
            tintColor={theme?.colors?.primary}
            onPress={() => navigate("Login")}
          />
        </HStack>
      </Box>
    </Box>
  );
}