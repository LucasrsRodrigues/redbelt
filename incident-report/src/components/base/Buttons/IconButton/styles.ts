import styled from "styled-components/native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const Container = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme?.colors?.primary};
  align-items: center;
  justify-content: center;
  bottom: ${hp(5)}px;
  right: ${wp(5)}px;
`;