import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DateTime } from 'luxon';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: 'lightblue',
  },
  cell: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
}));

function HitList({ rows }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow className={classes.row}>
            <TableCell className={classes.cell}>Hit ID</TableCell>
            <TableCell className={classes.cell}>Client ID</TableCell>
            <TableCell className={classes.cell}>Game ID</TableCell>
            <TableCell className={classes.cell}>Device ID</TableCell>
            <TableCell className={classes.cell}>Player ID</TableCell>
            <TableCell className={classes.cell}>Value 1</TableCell>
            <TableCell className={classes.cell}>Value 2</TableCell>
            <TableCell className={classes.cell}>Value 3</TableCell>
            <TableCell className={classes.cell}>Value 4</TableCell>
            <TableCell className={classes.cell}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.value1}>
              <TableCell component="th" scope="row" className={classes.cell}>
                {row.id}
              </TableCell>
              <TableCell className={classes.cell}>{row.clientId}</TableCell>
              <TableCell className={classes.cell}>{row.gameId}</TableCell>
              <TableCell className={classes.cell}>{row.deviceId}</TableCell>
              <TableCell className={classes.cell}>{row.userId}</TableCell>
              <TableCell className={classes.cell}>{row.value1}</TableCell>
              <TableCell className={classes.cell}>{row.value2}</TableCell>
              <TableCell className={classes.cell}>{row.value3}</TableCell>
              <TableCell className={classes.cell}>{row.value4}</TableCell>
              <TableCell className={classes.cell}>
                {DateTime.fromISO(row.time).toLocaleString(
                  DateTime.DATETIME_MED_WITH_SECONDS,
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HitList;
