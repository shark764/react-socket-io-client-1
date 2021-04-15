import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import React from 'react';
import { io } from 'socket.io-client';
import HitList from '../../../_components/HitList';
import SocketIOSVG from '../../../_components/Logo/SocketIO';
import { log } from '../../../_utilities';
import {
  socketToken,
  rpbffSocketIOUri,
  rpbffSocketIOPath,
} from '../../../_utilities/consts';
import { EVENTS } from '../../events';

function ReportingBFF() {
  const [, setChannel] = React.useState(null);
  const [socketio, setSocket] = React.useState(null);
  const [gameId, setGameId] = React.useState('');
  const [gameStatus, setGameStatus] = React.useState('no-game');
  const [tempHits, setTempHits] = React.useState([]);

  const handleSocketCommunication = (socket) => {
    /**
     * Open socket
     */
    socket.open();
    /**
     * Connection established
     */
    socket.on('connect', () => {
      setChannel(socket.connected ? socket.id : '');
      log(
        'info',
        `New connection established to ${rpbffSocketIOUri}`,
        socket.id,
      );

      socket.emit(
        '_game_running-test-data',
        { name: 'Bruce Banner', nickname: 'El Impotente Hulk' },
        (response) => {
          console.log('response.status ReportingBFF', response.status);
        },
      );
    });
    /**
     * New game started
     */
    socket.on(EVENTS.REPORTING_BFF.GAME_STARTED, (message) => {
      setGameId(message.id);
      setTempHits([]);
      setGameStatus('started');
      log('info', 'New game has started', message);
    });
    /**
     * Hit reveived
     */
    socket.on(EVENTS.REPORTING_BFF.TARGET_HIT, (message) => {
      setTempHits((tmpHits) => [...tmpHits, message.data]);
      log('success', 'Target hit received', message);
    });
    /**
     * Game finished
     */
    socket.on(EVENTS.REPORTING_BFF.GAME_FINISHED, (message) => {
      setGameStatus('finished');
      log('info', 'Game has finished', message);
    });

    socket.on('_game_event-hit', (message) => {
      log('warning', 'An important message', socket.id, message);
    });
  };

  React.useEffect(() => {
    // effect
    const socket = io(rpbffSocketIOUri, {
      forceNew: true,
      path: rpbffSocketIOPath,
      // transports: ['websocket'],
      reconnectionDelayMax: 10000,
      withCredentials: true,
      extraHeaders: {
        'levelup-token-header': socketToken,
      },
      query: {
        type: 'web-client',
      },
    });
    setSocket(socket);

    handleSocketCommunication(socket);

    return () => {
      // cleanup
      socket.close();
    };
  }, []);

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12}>
      <Box elevation={3} m={1} boxShadow={3} p={2}>
        <Typography variant="h5" display="inline">
          Reporting BFF Server
        </Typography>
        {' '}
        <Typography display="inline">
          Using
          {' '}
          <Link href="https://socket.io/docs/v4" target="_blank">
            Socket.IO
          </Link>
        </Typography>
        <SocketIOSVG />
        {!gameId ? (
          <>
            <Typography color="primary">Waiting for a Game</Typography>
            <CircularProgress color="secondary" size={25} />
          </>
        ) : (
          <Box m={1}>
            <Typography variant="body1" gutterBottom color="secondary">
              Game ID:
              {' '}
              {gameId}
            </Typography>
          </Box>
        )}
        <HitList rows={tempHits} />
      </Box>
    </Grid>
  );
}

export default ReportingBFF;
