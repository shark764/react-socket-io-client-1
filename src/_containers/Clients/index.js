import * as React from 'react';
import { Grid } from '@material-ui/core';
import { ApolloUIClient } from './Apollo';
import { ReportingClient } from './Reporting';
import { DeviceSimulator } from './DeviceSimulator';
import { Log } from '../../_components/Log';
import { LogProvider } from '../LogContext';

export function Clients() {
  return (
    <Grid container spacing={2}>
      <LogProvider>
        <Grid item container spacing={2} xs={7}>
          <DeviceSimulator />
        </Grid>
        <Grid item xs={5}>
          <Log />
        </Grid>
      </LogProvider>
      <LogProvider>
        <Grid item container spacing={2} xs={7}>
          <ReportingClient />
        </Grid>
        <Grid item xs={5}>
          <Log />
        </Grid>
      </LogProvider>

      {/* <ApolloUIClient /> */}
    </Grid>
  );
}
