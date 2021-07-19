import * as React from 'react';
import { io } from 'socket.io-client';
import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import axios from 'axios';
import { Close } from '@material-ui/icons';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import {
  reportingConfiguration,
  baseApiUrl,
  securityUrl,
} from '../../../_utilities/configuration';
import * as EVENTS from '../../../_events/reporting';
import { errorHandler, log } from '../../../_utilities';
import { useLogContext } from '../../LogContext';
import { Wrapper } from '../../../_components/Styled';

const loginUrl = `${securityUrl}/auth/login`;
const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
    access: 'Token ACCESS-TOKEN',
  },
};

export function ReportingClient() {
  const [socketClient, setSocketClient] = React.useState(null);
  const [channel, setChannel] = React.useState(null);
  const [jsonValue, setJsonValue] = React.useState({});
  const { addEntry } = useLogContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    // effect
    const { uri, path, port } = reportingConfiguration;

    const socket = io(uri, {
      path,
      port,
      forceNew: true,
      reconnectionDelayMax: 10000,
      secure: true,
      reconnection: true,
      transports: ['websocket', 'polling'],
      withCredentials: true,
      extraHeaders: {
        'levelup-token-header': 'levelup-token-header-value',
      },
      query: {
        type: 'web-client',
      },
    });

    setSocketClient(socket);

    /**
     * Open socket
     */
    socket.open();

    socket.on('connect', () => {
      setChannel(socket.connected ? socket.id : '');
      log('info', `New connection established to ${uri}`, socket.id);
      addEntry('ws', `New connection established to ${uri}`, null, 'info');
    });

    socket.on('disconnect', (reason) => {
      console.log(`Disconnect due to ${reason}`);
      addEntry('ws', `Disconnect due to ${reason}`, null, 'warning');
    });

    socket.on('connect_error', (err) => {
      console.log(`Connection failed due to ${err.message}`);
      addEntry('ws', `Connection failed due to ${err.message}`, null, 'error');
    });

    socket.on(EVENTS.REQUEST_SERVER_STATUS_SUCCEEDED, (message) => {
      log('info', EVENTS.REQUEST_SERVER_STATUS_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.REQUEST_SERVER_STATUS_SUCCEEDED} received`,
        message,
        'success'
      );
    });

    socket.on(EVENTS.REQUEST_SERVER_LOG_SUCCEEDED, (message) => {
      log('info', EVENTS.REQUEST_SERVER_LOG_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.REQUEST_SERVER_LOG_SUCCEEDED} received`,
        message,
        'success'
      );
    });

    socket.on(EVENTS.REQUEST_REGISTERED_DEVICES_SUCCEEDED, (message) => {
      log('info', EVENTS.REQUEST_REGISTERED_DEVICES_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.REQUEST_REGISTERED_DEVICES_SUCCEEDED} received`,
        message,
        'success'
      );
    });

    socket.on(EVENTS.SET_STATE_SUCCEEDED, (message) => {
      log('success', EVENTS.SET_STATE_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.SET_STATE_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.SET_STATE_FAILED, (message) => {
      log('error', EVENTS.SET_STATE_FAILED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.SET_STATE_FAILED} received`,
        message,
        'error'
      );
    });

    socket.on(EVENTS.START_GAME_SUCCEEDED, (message) => {
      log('success', EVENTS.START_GAME_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.START_GAME_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.START_GAME_FAILED, (message) => {
      log('error', EVENTS.START_GAME_FAILED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.START_GAME_FAILED} received`,
        message,
        'error'
      );
    });

    socket.on(EVENTS.END_GAME_SUCCEEDED, (message) => {
      log('success', EVENTS.END_GAME_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.END_GAME_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.END_GAME_FAILED, (message) => {
      log('error', EVENTS.END_GAME_FAILED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.END_GAME_FAILED} received`,
        message,
        'error'
      );
    });

    socket.on(EVENTS.WS_POST_COMMAND_SUCCEEDED, (message) => {
      log('success', EVENTS.WS_POST_COMMAND_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.WS_POST_COMMAND_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.WS_POST_COMMAND_FAILED, (message) => {
      log('error', EVENTS.WS_POST_COMMAND_FAILED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.WS_POST_COMMAND_FAILED} received`,
        message,
        'error'
      );
    });

    // Events comming from game-controller
    socket.on(EVENTS.DEVICES_CONTEXT_UPDATE, (message) => {
      log('success', EVENTS.DEVICES_CONTEXT_UPDATE, message);
      addEntry(
        'ws',
        `Event ${EVENTS.DEVICES_CONTEXT_UPDATE} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.TARGET_UPDATE, (message) => {
      log('success', EVENTS.TARGET_UPDATE, message);
      addEntry(
        'ws',
        `Event ${EVENTS.TARGET_UPDATE} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.TARGET_HIT, (message) => {
      log('success', EVENTS.TARGET_HIT, message);
      addEntry('ws', `Event ${EVENTS.TARGET_HIT} received`, message, 'success');
    });
    socket.on(EVENTS.DISPLAY_UPDATE, (message) => {
      log('success', EVENTS.DISPLAY_UPDATE, message);
      addEntry(
        'ws',
        `Event ${EVENTS.DISPLAY_UPDATE} received`,
        message,
        'success'
      );
    });

    return () => {
      // cleanup
      socket.close();
    };
  }, []);

  const handleGetServerStatus = () => {
    socketClient.emit(EVENTS.REQUEST_SERVER_STATUS);
    addEntry(
      'ws',
      `Event ${EVENTS.REQUEST_SERVER_STATUS} emitted`,
      null,
      'info'
    );
  };
  const handleGetServerLog = () => {
    socketClient.emit(EVENTS.REQUEST_SERVER_LOG);
    addEntry('ws', `Event ${EVENTS.REQUEST_SERVER_LOG} emitted`, null, 'info');
  };
  const handleGetRegisteredDevices = () => {
    socketClient.emit(EVENTS.REQUEST_REGISTERED_DEVICES);
    addEntry(
      'ws',
      `Event ${EVENTS.REQUEST_REGISTERED_DEVICES} emitted`,
      null,
      'info'
    );
  };
  const handleSetState = () => {
    socketClient.emit(EVENTS.SET_STATE, jsonValue);
    addEntry('ws', `Event ${EVENTS.SET_STATE} emitted`, null, 'info');
  };
  const handleStartGame = () => {
    socketClient.emit(EVENTS.START_GAME, jsonValue);
    addEntry('ws', `Event ${EVENTS.START_GAME} emitted`, null, 'info');
  };
  const handleEndGame = () => {
    socketClient.emit(EVENTS.END_GAME);
    addEntry('ws', `Event ${EVENTS.END_GAME} emitted`, null, 'info');
  };
  const handlePostCommand = () => {
    socketClient.emit(EVENTS.WS_POST_COMMAND, jsonValue);
    addEntry('ws', `Event ${EVENTS.WS_POST_COMMAND} emitted`, null, 'info');
  };

  /**
   * HTTP Requests
   */
  const baseHttpUri = `${reportingConfiguration.httpUri}${baseApiUrl}`;

  const handleGetServerStatusHttp = async () => {
    try {
      addEntry('http', `GET ${baseHttpUri}/server called`, null, 'info');
      const res = await axios.get(`${baseHttpUri}/server`, requestConfig);
      log('success', `GET ${baseHttpUri}/server succeeded`, res.data);
      addEntry(
        'http',
        `GET ${baseHttpUri}/server succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `GET ${baseHttpUri}/server failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleGetServerLogHttp = async () => {
    try {
      addEntry('http', `GET ${baseHttpUri}/log called`, null, 'info');
      const res = await axios.get(`${baseHttpUri}/log`, requestConfig);
      log('success', `GET ${baseHttpUri}/log succeeded`, res.data);
      addEntry('http', `GET ${baseHttpUri}/log succeeded`, res.data, 'success');
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `GET ${baseHttpUri}/log failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleGetRegisteredDevicesHttp = async () => {
    try {
      addEntry('http', `GET ${baseHttpUri}/devices called`, null, 'info');
      const res = await axios.get(`${baseHttpUri}/devices`, requestConfig);
      log('success', `GET ${baseHttpUri}/devices succeeded`, res.data);
      addEntry(
        'http',
        `GET ${baseHttpUri}/devices succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `GET ${baseHttpUri}/devices failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleSetStateHttp = async () => {
    try {
      addEntry('http', `POST ${baseHttpUri}/state called`, null, 'info');
      const res = await axios.post(
        `${baseHttpUri}/state`,
        jsonValue,
        requestConfig
      );
      log('success', `POST ${baseHttpUri}/state succeeded`, res.data);
      addEntry(
        'http',
        `POST ${baseHttpUri}/state succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${baseHttpUri}/state failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleStartGameHttp = async () => {
    try {
      addEntry('http', `POST ${baseHttpUri}/game called`, null, 'info');
      const res = await axios.post(
        `${baseHttpUri}/game`,
        jsonValue,
        requestConfig
      );
      log('success', `POST ${baseHttpUri}/game succeeded`, res.data);
      addEntry(
        'http',
        `POST ${baseHttpUri}/game succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${baseHttpUri}/game failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleEndGameHttp = async () => {
    const gameId = 'abcd1234';
    try {
      addEntry(
        'http',
        `DELETE ${baseHttpUri}/game/${gameId} called`,
        null,
        'info'
      );
      const res = await axios.delete(
        `${baseHttpUri}/game/${gameId}`,
        requestConfig
      );
      log(
        'success',
        `DELETE ${baseHttpUri}/game/${gameId} succeeded`,
        res.data
      );
      addEntry(
        'http',
        `DELETE ${baseHttpUri}/game/${gameId} succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `DELETE ${baseHttpUri}/game/${gameId} failed`,
        error.response ?? null,
        'error'
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      addEntry('http', `POST ${loginUrl} called`, null, 'info');
      const { data } = await axios.post(loginUrl, { email, password });
      setToken(data.data.accessToken);
      requestConfig.headers.access = `Token ${data.data.accessToken}`;
      log('success', `POST ${loginUrl} succeeded`, data);
      addEntry('http', `POST ${loginUrl} succeeded`, null, 'success');
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${loginUrl} failed`,
        error.response ?? null,
        'error'
      );
    }
  };

  const clearToken = () => {
    setToken('');
    requestConfig.headers.access = 'Token ACCESS-TOKEN';
  };

  const onJsonInputChange = (data) => {
    setJsonValue(data.jsObject);
  };

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12}>
      <Wrapper>
        <Typography variant="h5" color="primary">
          Reporting Server Client
        </Typography>
        <Typography variant="h6" color="secondary">
          {channel ?? 'Not channel'}
        </Typography>

        <Grid item container spacing={2} xs={12}>
          <Grid item xs={7}>
            <Box m={3}>
              <Typography variant="h6" color="textSecondary">
                WS Events
              </Typography>

              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleGetServerStatus}
              >
                Get Server Status
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleGetServerLog}
              >
                Get Server Log
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleGetRegisteredDevices}
              >
                Get Registered Devices
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleSetState}
              >
                Set State
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleStartGame}
              >
                Start Game
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleEndGame}
              >
                End Game
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handlePostCommand}
              >
                Post Command
              </Button>
            </Box>

            <Divider />

            <Box m={3}>
              <Typography variant="h6" color="textSecondary">
                HTTP Requests
              </Typography>

              <Box my={1} mb={2} mx={1}>
                <Typography variant="body1" color="textSecondary">
                  Log in to get a token
                </Typography>
                {token === '' ? (
                  <form onSubmit={handleSubmit}>
                    <Grid container direction="row" spacing={2}>
                      <Grid item>
                        <TextField
                          label="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          size="small"
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          size="small"
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                ) : (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={clearToken}
                    startIcon={<Close />}
                  >
                    Clear token
                  </Button>
                )}
              </Box>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleGetServerStatusHttp}
                disabled={token === ''}
              >
                Get Server Status
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleGetServerLogHttp}
                disabled={token === ''}
              >
                Get Server Log
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleGetRegisteredDevicesHttp}
                disabled={token === ''}
              >
                Get Registered Devices
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleSetStateHttp}
                disabled={token === ''}
              >
                Set State
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleStartGameHttp}
                disabled={token === ''}
              >
                Start Game
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleEndGameHttp}
                disabled={token === ''}
              >
                End Game
              </Button>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box m={3}>
              <Typography variant="body1" color="textSecondary">
                Body
              </Typography>
              <JSONInput
                placeholder={{ data: 'paste your json here...' }}
                locale={locale}
                height="300px"
                width="auto"
                onChange={onJsonInputChange}
                theme="light_mitsuketa_tribute"
              />
            </Box>
          </Grid>
        </Grid>
      </Wrapper>
    </Grid>
  );
}
