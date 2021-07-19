import * as React from 'react';
import { io } from 'socket.io-client';
import {
  Box, Button, Divider, Grid, Typography
} from '@material-ui/core';
import axios from 'axios';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import {
  gameControllerConfiguration,
  baseApiUrl,
} from '../../../_utilities/configuration';
import * as EVENTS from '../../../_events/game-controller';
import { errorHandler, log } from '../../../_utilities';
import { useLogContext } from '../../LogContext';
import { Wrapper } from '../../../_components/Styled';

export function DeviceSimulator() {
  const [socketClient, setSocketClient] = React.useState(null);
  const [channel, setChannel] = React.useState(null);
  const [jsonValue, setJsonValue] = React.useState({});
  const { addEntry } = useLogContext();

  React.useEffect(() => {
    // effect
    const { uri, path, port } = gameControllerConfiguration;

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
        type: 'device',
      },
      // rejectUnauthorized: null
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

    socket.on(EVENTS.TEST_SUCCEEDED, (message) => {
      log('success', EVENTS.TEST_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.TEST_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.TEST_FAILED, (message) => {
      log('error', EVENTS.TEST_FAILED, message);
      addEntry('ws', `Event ${EVENTS.TEST_FAILED} received`, message, 'error');
    });
    socket.on(EVENTS.REGISTER_SUCCEEDED, (message) => {
      log('success', EVENTS.REGISTER_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.REGISTER_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.REGISTER_FAILED, (message) => {
      log('error', EVENTS.REGISTER_FAILED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.REGISTER_FAILED} received`,
        message,
        'error'
      );
    });
    socket.on(EVENTS.DISPLAY_SUCCEEDED, (message) => {
      log('success', EVENTS.DISPLAY_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.DISPLAY_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.DISPLAY_FAILED, (message) => {
      log('error', EVENTS.DISPLAY_FAILED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.DISPLAY_FAILED} received`,
        message,
        'error'
      );
    });
    socket.on(EVENTS.HIT_SUCCEEDED, (message) => {
      log('success', EVENTS.HIT_SUCCEEDED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.HIT_SUCCEEDED} received`,
        message,
        'success'
      );
    });
    socket.on(EVENTS.HIT_FAILED, (message) => {
      log('error', EVENTS.HIT_FAILED, message);
      addEntry('ws', `Event ${EVENTS.HIT_FAILED} received`, message, 'error');
    });

    /**
     * Events comming from game-controller
     */
    socket.on(EVENTS.SET_DEVICE_CONFIG, (message) => {
      log('info', EVENTS.SET_DEVICE_CONFIG, message);
      addEntry(
        'ws',
        `Event ${EVENTS.SET_DEVICE_CONFIG} received`,
        message,
        'info'
      );
      socket.emit(EVENTS.SET_DEVICE_CONFIG_COMPLETED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.SET_DEVICE_CONFIG_COMPLETED} emitted`,
        null,
        'info'
      );
    });
    socket.on(EVENTS.SET_DEVICE_MODE, (message) => {
      log('info', EVENTS.SET_DEVICE_MODE, message);
      addEntry(
        'ws',
        `Event ${EVENTS.SET_DEVICE_MODE} received`,
        message,
        'info'
      );
      socket.emit(EVENTS.SET_DEVICE_MODE_COMPLETED, message);
      addEntry(
        'ws',
        `Event ${EVENTS.SET_DEVICE_MODE_COMPLETED} emitted`,
        null,
        'info'
      );
    });
    socket.on(EVENTS.START_DEVICE, (message) => {
      log('info', EVENTS.START_DEVICE, message);
      addEntry('ws', `Event ${EVENTS.START_DEVICE} received`, message, 'info');
      socket.emit(EVENTS.HIT, {
        device_id: '',
        hit_sequence: 0,
        hit_time: new Date().getTime(),
        hit_power: 80,
        hit_direction: 0,
        hit_distance: 0,
      });
      addEntry('ws', `Event ${EVENTS.HIT} emitted`, null, 'info');
    });
    socket.on(EVENTS.STATUS, (message) => {
      log('info', EVENTS.STATUS, message);
      addEntry('ws', `Event ${EVENTS.STATUS} received`, message, 'info');
      socket.emit(EVENTS.REGISTER, {
        start_effect: '',
        hit_effect: '',
        complete_effect: '',
        timeout_effect: '',
        errant_effect: '',
        local_connect: '',
        serial_connect: '',
        remote_connect: '',
        remote_display_ip: '',
      });
      addEntry('ws', `Event ${EVENTS.REGISTER} emitted`, null, 'info');
    });

    return () => {
      // cleanup
      socket.close();
    };
  }, []);

  const handleTest = () => {
    socketClient.emit(EVENTS.TEST, jsonValue);
    addEntry('ws', `Event ${EVENTS.TEST} emitted`, null, 'info');
  };
  const handleRegister = () => {
    // 2.1 ) Smart target device sends a REGISTRATION event
    socketClient.emit(EVENTS.REGISTER, jsonValue);
    addEntry('ws', `Event ${EVENTS.REGISTER} emitted`, null, 'info');
  };
  const handleDisplay = () => {
    socketClient.emit(EVENTS.DISPLAY, jsonValue);
    addEntry('ws', `Event ${EVENTS.DISPLAY} emitted`, null, 'info');
  };
  const handleHit = () => {
    socketClient.emit(EVENTS.HIT, jsonValue);
    addEntry('ws', `Event ${EVENTS.HIT} emitted`, null, 'info');
  };

  /**
   * HTTP Requests
   */
  const baseHttpUri = `${gameControllerConfiguration.httpUri}${baseApiUrl}`;

  const handleTestHttp = async () => {
    try {
      addEntry('http', `POST ${baseApiUrl}/test called`, jsonValue, 'info');
      const res = await axios.post(`${baseHttpUri}/test`, jsonValue);
      log('success', `POST ${baseApiUrl}/test succeeded`, res.data);
      addEntry(
        'http',
        `POST ${baseApiUrl}/test succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${baseApiUrl}/test failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleRegisterHttp = async () => {
    try {
      addEntry('http', `POST ${baseApiUrl}/register called`, jsonValue, 'info');
      const res = await axios.post(`${baseHttpUri}/register`, jsonValue);
      log('success', `POST ${baseApiUrl}/register succeeded`, res.data);
      addEntry(
        'http',
        `POST ${baseApiUrl}/register succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${baseApiUrl}/register failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleDisplayHttp = async () => {
    try {
      addEntry('http', `POST ${baseApiUrl}/display called`, jsonValue, 'info');
      const res = await axios.post(`${baseHttpUri}/display`, jsonValue);
      log('success', `POST ${baseApiUrl}/display succeeded`, res.data);
      addEntry(
        'http',
        `POST ${baseApiUrl}/display succeeded`,
        res.data,
        'success'
      );
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${baseApiUrl}/display failed`,
        error.response ?? null,
        'error'
      );
    }
  };
  const handleHitHttp = async () => {
    try {
      addEntry('http', `POST ${baseApiUrl}/hit called`, jsonValue, 'info');
      const res = await axios.post(`${baseHttpUri}/hit`, jsonValue);
      log('success', `POST ${baseApiUrl}/hit succeeded`, res.data);
      addEntry('http', `POST ${baseApiUrl}/hit succeeded`, res.data, 'success');
    } catch (error) {
      errorHandler(error);
      addEntry(
        'http',
        `POST ${baseApiUrl}/hit failed`,
        error.response ?? null,
        'error'
      );
    }
  };

  const onJsonInputChange = (data) => {
    setJsonValue(data.jsObject);
  };

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12}>
      <Wrapper>
        <Typography variant="h5" color="primary">
          Device Simulator
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
                onClick={handleTest}
              >
                Test
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleRegister}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleDisplay}
              >
                Display
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleHit}
              >
                Hit
              </Button>
            </Box>

            <Divider />

            <Box m={3}>
              <Typography variant="h6" color="textSecondary">
                HTTP Requests
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleTestHttp}
              >
                Test
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleRegisterHttp}
              >
                Register
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleDisplayHttp}
              >
                Display
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleHitHttp}
              >
                Hit
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
