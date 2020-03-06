import styled from 'styled-components';
import {
  InputBorder,
  InputLabelColor,
  DisabledInputBg,
  DisabledInputColor,
  MyAccountTextDark
} from 'styles/variables';

export const WrapStyled = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

export const InputElementWrapperStyled = styled.div``;

export const InputElementLabelStyled = styled.label`
  display: block;
  margin-bottom: 12px;
  color: ${InputLabelColor};
  font-size: 13px;
  font-weight: 700;
`;

export const InputElementStyled = styled.input`
  width: 100%;
  padding: 10px 16px;

  border: 1px solid ${InputBorder};
  border-radius: 8px;
  font-size: 13px;
  line-height: 13px;

  &:focus {
    border: 1px solid ${MyAccountTextDark};
  }

  &:disabled {
    background-color: ${DisabledInputBg};
    border: 1px solid ${InputBorder};
    color: ${DisabledInputColor};
    font-style: italic;
  }
`;
