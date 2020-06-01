import styled, { css } from 'styled-components';
import * as colors from 'styles/variables';
import { media } from 'styles/BreakPoints';

export const ContentWrapperStyled = styled.main`
  position: relative;

  width: 55%;
  margin: 40px auto 0 auto;
  padding-bottom: 65px;

  text-align: center;

  ${media.small`
    width: 80%;
  `}
`;

export const FromStyled = styled.form`
  & input {
    position: relative;
  }
  & button:last-child {
    margin: 35px 0 10px;
  }
`;

export const SocialStyled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  margin-top: 10px;

  p {
    margin-top: 20px;
  }

  button {
    width: 48%;
    margin: 10px 0 30px 0;
  }

  ${media.smallest`
    flex-direction: column;
    
    margin-bottom: 20px;
    
    button{
      width: 100%;

      margin: 5px 0;
    }
  `}
`;

export const SeparatorStyled = styled.div`
  display: block;
  width: 100%;

  padding: 20px 0;

  color: ${colors.MainTextColor};

  text-align: center;
  font-size: 13px;

  overflow: hidden;

  &::before,
  &::after {
    position: relative;
    display: inline-block;
    vertical-align: middle;

    content: '';
    height: 1px;
    width: 40%;

    background-color: ${colors.MediumGrey};
  }
  &::before {
    right: 5%;

    margin-left: -50%;
  }
  &::after {
    left: 5%;
    margin-right: -50%;
  }
`;

export const FormErrorStyled = styled.div`
  position: absolute;
  top: -15px;
  width: 100%;

  color: ${colors.ErrorColor};

  font-size: 13px;
  font-weight: 600;
  font-family: 'Geomanist';
`;

export const StyledRecaptcha = styled.div`
  width: 100%;
  margin-top: 25px;

  iframe {
    height: 78px;
  }
`;

export const StyledErrorDiv = styled.div`
  position: relative;
  top: -20px;
  left: 5px;
  width: 100%;  
  color: ${colors.ErrorColor};
  text-align: left;
  font-size: 13px;
  font-family: 'Geomanist';
  overflow: visible;
  ${props =>
    props.lowerPos &&
    css`
      top: -5px;
    `}
  ${props =>
    props.lowestPos &&
    css`
      top: 5px;
    `}
  ${props =>
    props.topPos &&
    css`
      text-align: center;
      left: 0;
      top: 17px;
    `}
`;
