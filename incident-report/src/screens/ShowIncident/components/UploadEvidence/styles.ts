import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme?.colors?.shape};
  padding: 15px;
  border-radius: 15px;
  border-color: ${({ theme }) => theme.colors.primary};
  border-width: 1px;
  border-style: dashed;

  overflow: hidden;
`;
