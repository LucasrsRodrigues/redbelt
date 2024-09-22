import styled, { css } from "styled-components/native";

interface IWrapperInputIconProps {
  error: boolean;
}

export const WrapperInputIcon = styled.View<IWrapperInputIconProps>`
  width: 100%;

  background-color: ${({ theme }) => theme.colors.shape};
  padding: 15px;
  border-radius: 12px;

  flex-direction: row;

  gap: 10px;

  justify-content: space-between;
  border: 1px solid  ${({ theme }) => theme.colors.shape};

  ${({ error }) => error && css`
   border-color: ${({ theme }) => theme.colors.error};
  `};

`;

export const InputErrorContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.error}17;
  padding: 10px 8px;
  border-radius: 4px;
  flex-direction: row;
  gap: 10px;
`;

export const Input = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.placeholder,
}))`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.heading};
  flex: 1;
  
`;
