import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { Box } from '@components/base/Box';
import { Heading } from '@components/base/Typography/Heading';
import { Button, HStack, Text, VStack } from '@components/base';

import { useTheme } from 'styled-components/native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import EyeIcon from "@assets/icons/bold/Hide.svg";
import { useForm } from 'react-hook-form';
import { ControlledInput } from '@components/ControlledInput';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

const schema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Preencha o Email."),
  password: Yup.string().required("Preencha a Senha."),
});

export function Login() {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function submit(data) {
    try {
      await signIn(data);

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
        Sign In to Your Account
      </Heading>

      <VStack spacing={24} marginTop={hp(5)}>
        <ControlledInput
          control={control}
          name="email"
          label='Email'
          placeholder='Your Email Address'
          error={errors?.email?.message}
        />

        <ControlledInput
          control={control}
          name="password"
          label='Password'
          placeholder='Enter Your Password'
          rightElement={<Pressable onPress={() => setShowPassword(prev => !prev)}><EyeIcon fill={showPassword ? theme?.colors?.primary : theme?.colors?.icon} /></Pressable>}
          secureTextEntry={!showPassword}
          error={errors?.password?.message}
        />

        <Button
          label='Sign In'
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
          <Text>Don’t have an account?</Text>

          <Button
            label='Sign Up'
            type='outline'
            onPress={() => navigate("Register")}
            tintColor={theme?.colors?.primary}
          />
        </HStack>
      </Box>



    </Box >
  );
}