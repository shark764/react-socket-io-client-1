import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blueGrey, green } from '@material-ui/core/colors';
import logo from './logo.svg';
import './_styles/App.css';
import Clients from './_containers/Clients';

function App() {
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
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <main className="App-main">
          <Clients />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
