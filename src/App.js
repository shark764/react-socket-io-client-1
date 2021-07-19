import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import logo from './logo.svg';
import './_styles/App.css';
import { Clients } from './_containers/Clients';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Grid
          container
          item
          spacing={0}
          alignItems="center"
          justify="center"
          xs={6}
        >
          <Grid item xs={1}>
            <img src={logo} className="App-logo" alt="logo" />
          </Grid>
          <Grid item xs>
            <Typography>Level Up - WS / HTTP Events Tester</Typography>
          </Grid>
        </Grid>
      </header>

      <main className="App-main">
        <Clients />
      </main>
    </div>
  );
}

export default App;
