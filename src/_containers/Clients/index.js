import { Grid } from '@material-ui/core';
import React from 'react';
import Apollo from './Apollo';
import ReportingBFF from './ReportingBFF';
import GameController from './GameController';

function Clients() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <GameController />
          <ReportingBFF />
          <Apollo />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Clients;
