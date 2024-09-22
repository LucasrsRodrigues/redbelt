import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.shape};
  padding: 14px 18px;
  border-radius: 12px;

  /*  */
  margin: 0 20px;

  height: 80px;
`;

export const Line = styled.View``;