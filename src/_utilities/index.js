import faker from 'faker';

export function log(type, msg, ...args) {
  switch (type) {
    case 'info':
      console.log(
        `%c${msg}`,
        'color: #00529B; background-color: #BDE5F8;',
        ...args
      );
      break;
    case 'success':
      console.log(
        `%c${msg}`,
        'color: #4F8A10; background-color: #DFF2BF;',
        ...args
      );
      break;
    case 'warning':
      console.log(
        `%c${msg}`,
        'color: #9F6000; background-color: #FEEFB3;',
        ...args
      );
      break;
    case 'error':
      console.log(
        `%c${msg}`,
        'color: #D8000C; background-color: #FFD2D2;',
        ...args
      );
      break;
    default:
      console.log(
        `%c${msg}`,
        'background: LightGoldenRodYellow; color: darkslategray;',
        ...args
      );
      break;
  }
}

export function errorHandler(error) {
  if (error.response) {
    // Request made and server responded
    log(
      'error',
      'error.response',
      error.response.data,
      error.response.status,
      error.response.headers
    );
  } else if (error.request) {
    // The request was made but no response was received
    log('error', 'error.request', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    log('error', 'Error', error.message);
  }
}

export const bodyTemplates = {
  register: () => ({
    // From ‘targetConfig’ struct in ‘SmartTarget.h’ file.
    device_id: faker.datatype.uuid(),
    device_time: new Date().getTime(),
    device_type: 'SMART_STEEL',
    target_type: 'STATIC',
    target_shape: 'HEXAGON',
    target_size: 100000,
    device_info: 'Raspberry Pi 4 Model B',
    build_info: '1.0.0',
    pixel_ring: '',
    count_mode: 'UP',
    hit_count: faker.datatype.number(10),
    hit_count_timeout: new Date().getTime(),
    // From ‘effectsConfig’ struct in ‘SmartTarget.h’ file.
    matrix_effects: {
      start_effect: false,
      hit_effect: false,
      complete_effect: false,
      timeout_effect: false,
      errant_effect: false,
      local_connect: false,
      serial_connect: false,
      remote_connect: false,
      remote_display_ip: '192.168.0.1',
    },
  }),
  // From ‘aHit’ struct in ‘SmartTarget.h’ file.
  hit: () => ({
    device_id: faker.datatype.uuid(),
    hit_sequence: faker.datatype.number(100),
    hit_time: new Date().getTime(),
    hit_power: faker.datatype.number(1024),
    hit_direction: faker.datatype.boolean() ? 99 : 100,
    hit_distance: faker.datatype.boolean() ? 99 : 100,
  }),
  hitSeq0: () => ({
    device_id: faker.datatype.uuid(),
    hit_sequence: 0,
    hit_time: new Date().getTime(),
    hit_power: 0,
    hit_direction: 0,
    hit_distance: 0,
  }),
  display: () => ({
    device_id: faker.datatype.uuid(),
    device_time: new Date().getTime(),
    display_command: 'MODE',
    display_data: 'target reloaded',
    display_text: 'target changed mode to active',
    additional_text: '',
    foreground_color: 20840,
    background_color: 6821632,
  }),
  heartbeat: () => ({
    deviceId: faker.datatype.uuid(),
    deviceType: 'Raspberry Pi 4 Model B',
    osVersion: 'Ubuntu 18.04.1 LTS',
    softwareVersion: '1.0.0',
    devices: [
      {
        deviceId: faker.datatype.uuid(),
        deviceType: 'Raspberry Pi 4 Model B',
        osVersion: 'Ubuntu 18.04.1 LTS',
        softwareVersion: '1.0.0',
      },
    ],
  }),
  ping: () => ({ eventType: 'PING' }),
  pingAll: () => ({ eventType: 'PING_ALL' }),
  startDevice: () => ({
    eventType: 'START_DEVICE',
    device_id: faker.datatype.uuid(),
  }),
  deviceConfig: () => ({
    eventType: 'SET_DEVICE_CONFIG',
    config: {
      device_id: faker.datatype.uuid(),
      device_time: new Date().getTime(),
      device_type: 'SMART_STEEL',
      target_type: 'STATIC',
      target_shape: 'HEXAGON',
      target_size: 100000,
      device_info: 'Raspberry Pi 4 Model B',
      build_info: '1.0.0',
      pixel_ring: '',
      count_mode: 'UP',
      hit_count: faker.datatype.number(10),
      hit_count_timeout: new Date().getTime(),
      matrix_effects: null,
      pixelring_effects: null,
      // For diagnostics purposes.
      primary_channel: '',
      secondary_channel: '',
      tertiary_channel: '',
      threshold_level: '',
      calibration_level: '',
      primary_analog_input: '',
      secondary_analog_input: '',
      tertiary_analog_input: '',
      sensor_mode: '',
      logging_level: '',
      dwell_time: '',
    },
  }),
  deviceMode: () => ({
    eventType: 'SET_DEVICE_MODE',
    mode: {
      device_id: faker.datatype.uuid(),
      device_time: new Date().getTime(),
      device_type: 'SMART_STEEL',
      target_type: 'STATIC',
      target_shape: 'HEXAGON',
      target_size: 100000,
      device_info: 'Raspberry Pi 4 Model B',
      build_info: '1.0.0',
      pixel_ring: '',
      count_mode: 'UP',
      hit_count: faker.datatype.number(10),
      hit_count_timeout: new Date().getTime(),
      matrix_effects: {
        start_effect: false,
        hit_effect: false,
        complete_effect: false,
        timeout_effect: false,
        errant_effect: false,
        local_connect: false,
        serial_connect: false,
        remote_connect: false,
        remote_display_ip: '192.168.0.1',
      },
      pixelring_effects: null,
      primary_channel: '',
      secondary_channel: '',
      tertiary_channel: '',
      threshold_level: '',
      calibration_level: '',
      primary_analog_input: '',
      secondary_analog_input: '',
      tertiary_analog_input: '',
      sensor_mode: '',
      logging_level: '',
      dwell_time: '',
    },
  }),
};
export const gameControllerTemplates = [
  { value: 'register', label: 'Register' },
  { value: 'hit', label: 'Hit' },
  { value: 'hitSeq0', label: 'Hit (Sequence 0)' },
  { value: 'display', label: 'Display' },
];
export const reportingTemplates = [
  { value: 'heartbeat', label: 'Send Heartbeat' },
  { value: 'ping', label: 'Ping' },
  { value: 'pingAll', label: 'Ping all' },
  { value: 'deviceConfig', label: 'Set device config' },
  { value: 'deviceMode', label: 'Set device mode' },
  { value: 'startDevice', label: 'Start device' },
];
export const getTemplate = (id) => bodyTemplates[id]?.() ?? { data: 'paste your json here...' };
