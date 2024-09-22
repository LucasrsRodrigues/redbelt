import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Text } from '@components/base/Typography/Text';

import GoogleIcon from "@assets/icons/social/google.svg";
import FacebookIcon from "@assets/icons/social/facebook.svg";
import AppleIcon from "@assets/icons/social/apple.svg";

import * as S from './styles';

interface ISocialButtonProps extends TouchableOpacityProps {
  type?: "google" | "facebook" | "apple";
}

const text = {
  google: "Continue with Google",
  facebook: "Continue with Facebook",
  apple: "Continue with Apple",
}

const icon = {
  google: <GoogleIcon />,
  facebook: <FacebookIcon />,
  apple: <AppleIcon />
}

export function SocialButton({ type = "google", ...rest }: ISocialButtonProps) {
  return (
    <S.Container
      {...rest}
    >

      <S.Icon>
        {icon[type]}
      </S.Icon>

      <Text variant='medium' weight='medium' >
        {text[type]}
      </Text>
    </S.Container>
  );
}