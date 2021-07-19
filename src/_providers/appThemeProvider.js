import * as React from 'react';
import {
  createMuiTheme,
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core';
import { blueGrey, green } from '@material-ui/core/colors';
import { ThemeProvider } from 'styled-components';

export function AppThemeProvider({ children }) {
  const theme = createMuiTheme({
    palette: {
      primary: blueGrey,
      secondary: green,
    },
    overrides: {
      MuiButton: {
        root: {
          margin: '0px 5px',
          padding: '5px',
        },
      },
      MuiGrid: {
        item: {
          padding: '1px',
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </ThemeProvider>
    </MuiThemeProvider>
  );
}
