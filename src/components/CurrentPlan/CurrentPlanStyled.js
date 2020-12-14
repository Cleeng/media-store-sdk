import styled, { css } from 'styled-components';
import { IconsColor, White, LineColor, ConfirmColor } from 'styles/variables';
import { mediaFrom } from 'styles/BreakPoints';
import Button from 'components/Button';

export const WrapStyled = styled.div`
  position: relative;

  margin-bottom: 20px;
`;

export const SubscriptionStyled = styled.div`
  background: ${White};
  border: 1px solid ${LineColor};
  border-radius: 12px;

  padding: 20px 18px;

  ${props =>
    props.onClick &&
    props.cursorPointer &&
    css`
      cursor: pointer;
    `}
  &:not(:last-child) {
    margin-bottom: 20px;
    padding-bottom: 20px;
  }

  position: relative;
  z-index: 1;

  &::after {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -1px;
    left: -1px;

    content: '';
    z-index: -1;

    border-radius: 12px;
    border: 1px solid ${ConfirmColor};
    box-shadow: 0px 3px 20px #6767672c;

    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  ${props =>
    props.isSelected &&
    css`
      &::after {
        opacity: 1;
      }
    `}
`;

export const SubscriptionActionsStyled = styled.div`
  display: flex;
  justify-content: flex-end;

  border-top: 1px solid ${IconsColor};
  margin-top: 17px;
`;
export const SimpleButtonStyled = styled(Button)`
  margin: 15px 0 0 0;
  width: 48%;

  text-transform: capitalize;
  &:disabled:hover {
    opacity: 0.9;
  }
  ${mediaFrom.small &&
    css`
      margin: 17px 0 0 5px;
      width: unset;
      max-width: unset;
    `}
`;

export const FullWidthButtonStyled = styled(Button)`
  width: 100%;
  margin: 20px 0 0 0;
  ${mediaFrom.small &&
    css`
      margin: 17px 0 0 5px;
      width: unset;
      max-width: unset;
    `}
`;
