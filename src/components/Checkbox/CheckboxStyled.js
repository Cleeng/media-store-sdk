import styled, { css } from 'styled-components';
import {
  MainTextColor,
  ErrorColor,
  CheckboxBorderColor,
  FocusColor
} from 'styles/variables';
import tickIcon from 'assets/images/input/tick.svg';

export const CheckboxStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin-top: 10px;

  align-items: center;
  font-size: 13px;
  color: ${MainTextColor};

  &:focus {
    outline: none;
  }
`;

export const ConsentDefinitionStyled = styled.div`
  padding-left: 10px;
  margin-top: 0;
  font-family: 'Geomanist';
  font-weight: 400;
  text-align: left;

  a {
    color: ${MainTextColor};
    text-decoration: underline;
    &:focus {
      outline: 2px solid ${FocusColor};
    }
  }
`;

export const CheckFrameStyled = styled.div`
  box-sizing: border-box;
  border: 1px solid ${CheckboxBorderColor};
  width: 20px;
  min-width: 20px;
  height: 20px;
  border-radius: 2px;
  position: relative;
  &:focus {
    outline: 2px solid ${FocusColor};
  }
  ${props =>
    props.error &&
    css`
      border-color: ${ErrorColor};
    `}
`;

export const CheckMarkStyled = styled.div`
  background-image: url(${tickIcon});
  width: 13px;
  height: 10px;
  top: 4px;
  left: 3px;
  position: absolute;
  background-repeat: no-repeat;
`;

export const ErrorFieldStyled = styled.div`
  color: ${ErrorColor};
  font-size: 12px;
  font-family: 'Geomanist';
  font-weight: 300;
  position: relative;
  width: 100%;
  margin-top: 10px;
  text-align: center;
`;
