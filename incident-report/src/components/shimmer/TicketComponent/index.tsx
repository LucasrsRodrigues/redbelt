import { LinearGradient } from 'expo-linear-gradient';
import { createShimmerPlaceHolder } from 'expo-shimmer-placeholder';
import React from 'react';

import * as S from "./styles";
import { HStack, VStack } from '@components/base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';



const ShimmerPlaceholder = createShimmerPlaceHolder(LinearGradient);


function SkeletonTicketComponent() {
  return (
    <S.Container>
      <HStack
        spacing={12}
        justifyContent="space-between"
        alignItems="center"
      >
        <ShimmerPlaceholder
          style={{
            width: 46,
            height: 46,
            borderRadius: 100
          }}
          shimmerColors={['#ffffff08', '#ffffff55', '#ffffff08']}
        />

        <VStack flex={1} spacing={10}>
          <ShimmerPlaceholder
            style={{
              width: wp(24),
              borderRadius: 5
            }}
            shimmerColors={['#ffffff08', '#ffffff55', '#ffffff08']}
          />

          <ShimmerPlaceholder
            style={{
              width: wp(30),
              borderRadius: 5
            }}
            shimmerColors={['#ffffff08', '#ffffff55', '#ffffff08']}
          />
        </VStack>

        <ShimmerPlaceholder
          style={{
            width: wp(20),
            borderRadius: 5
          }}
          shimmerColors={['#ffffff08', '#ffffff55', '#ffffff08']}
        />
      </HStack>
    </S.Container>
  )
}

export function ShimmerTicketComponent() {

  return (
    <VStack spacing={10}>
      <SkeletonTicketComponent />
      <SkeletonTicketComponent />
      <SkeletonTicketComponent />
    </VStack>
  );
}