import styled from "styled-components/native";

export const Container = styled.View`
  position: relative;
  width: 100%;
  height: 52px;

  background: ${({ theme }) => theme.colors.background};
  border-radius: 58px;

  align-items: center;
  justify-content: center;

  flex-direction: row;
  justify-content: center;

`;

export const Icon = styled.View`
  position: absolute;
  left: 20px;
`;