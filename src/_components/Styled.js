import { Paper } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled(Paper)`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;
    border: 1px solid ${theme.palette.divider}; 
    border-radius: ${theme.shape.borderRadius};
    background-color: ${theme.palette.background.paper};
    color: ${theme.palette.text.secondary};
  `};
`;
