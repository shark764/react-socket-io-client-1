import {
  Box,
  Button,
  Collapse,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Close, KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { DateTime } from 'luxon';
import * as React from 'react';
import ReactJson from 'react-json-view';
import { useLogContext } from '../_containers/LogContext';
import { Wrapper } from './Styled';

const colorsMap = {
  success: 'textPrimary',
  info: 'textSecondary',
  error: 'error',
  warning: 'textSecondary',
};
const eventTypesMap = {
  ws: 'WS',
  http: 'HTTP',
};

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body2" key={row.id} color={colorsMap[row.type]}>
            {eventTypesMap[row.evType]}
          </Typography>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body2" key={row.id} color={colorsMap[row.type]}>
            {row.text}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="body2" key={row.id} color={colorsMap[row.type]}>
            {DateTime.fromJSDate(row.timestamp).toLocaleString(
              DateTime.TIME_WITH_SECONDS
            )}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="body2" gutterBottom component="div">
                Response body
              </Typography>
              {row.data && <ReactJson name={false} src={row.data} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export function Log() {
  const {
    entries: [entries],
    clear,
  } = useLogContext();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Wrapper>
      <Button
        variant="text"
        color="primary"
        onClick={clear}
        startIcon={<Close />}
        mb={1}
      >
        Clear
      </Button>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Event</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry) => (
                <Row key={entry.id} row={entry} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        component="div"
        count={entries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Wrapper>
  );
}
