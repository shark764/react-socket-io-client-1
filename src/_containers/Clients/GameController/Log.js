import { Box, Typography } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';

function Log({ entries = [] }) {
  return (
    <Box m={1} p={1}>
      {entries.map((entry) => (
        <Typography variant="body2">
          -
          {' '}
          {entry.text}
          {' '}
          -
          {' '}
          {DateTime.fromJSDate(entry.timestamp).toLocaleString(
            DateTime.DATETIME_FULL_WITH_SECONDS,
          )}
        </Typography>
      ))}
    </Box>
  );
}

export default Log;
