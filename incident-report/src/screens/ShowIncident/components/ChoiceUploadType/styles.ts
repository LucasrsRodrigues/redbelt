import styled from "styled-components/native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const ChoiceButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 10px;
  border-radius: 12px;
  align-items: center;
  gap: 5px;
  min-width: ${wp(20)}px;

  border: 1px solid ${({ theme }) => theme.colors.shape};
`;

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: #00000080;
  justify-content: center;
  align-items: center;
`;