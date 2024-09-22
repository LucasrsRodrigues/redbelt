import { widthPercentageToDP } from "react-native-responsive-screen";
import styled from "styled-components/native";

interface ICheckboxContainerProps {
  isCheked: boolean;
}

export const CheckboxContainer = styled.TouchableOpacity<ICheckboxContainerProps>`
  width: ${widthPercentageToDP(4.80)}px;
  height: ${widthPercentageToDP(4.80)}px;
  
  border-radius: 4px;
  border: .5px solid ${({ theme, isCheked }) => isCheked ? theme.colors.main : theme.colors.grey_70};

  background: ${({ theme, isCheked }) => isCheked ? theme.colors.main : "transparent"};

  align-items: center;
  justify-content: center;
`;