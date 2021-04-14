import { Grid } from '@material-ui/core';
import React from 'react';
import Apollo from './Apollo';
import SocketIO from './SocketIO';
import SocketIOGC from './SocketIOGC';

function Clients() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          <SocketIOGC />
          <SocketIO />
          <Apollo />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Clients;
