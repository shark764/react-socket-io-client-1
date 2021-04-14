export const socketIOPort = 4010;
export const socketIOEndpoint = `http://localhost:${socketIOPort}?type=devices`;
export const socketIOGCPort = 3010;
export const socketIOGCEndpoint = `http://localhost:${socketIOGCPort}?type=devices`;
export const socketToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const apolloPort = 3009;
export const apolloHttpUri = `http://localhost:${apolloPort}/graphql`;
export const apolloWsUri = `ws://localhost:${apolloPort}/subscriptions`;

export function log(type, msg, ...args) {
  switch (type) {
    case 'info':
      console.log(
        `%c${msg}`,
        'color: #00529B; background-color: #BDE5F8;',
        ...args,
      );
      break;
    case 'success':
      console.log(
        `%c${msg}`,
        'color: #4F8A10; background-color: #DFF2BF;',
        ...args,
      );
      break;
    case 'warning':
      console.log(
        `%c${msg}`,
        'color: #9F6000; background-color: #FEEFB3;',
        ...args,
      );
      break;
    case 'error':
      console.log(
        `%c${msg}`,
        'color: #D8000C; background-color: #FFD2D2;',
        ...args,
      );
      break;
    default:
      console.log(
        `%c${msg}`,
        'background: LightGoldenRodYellow; color: darkslategray;',
        ...args,
      );
      break;
  }
}

export const themes = {
  light: {
    global: {
      colors: {
        brand: '#8bcaca',
        'accent-1': '#fea889',
        'accent-2': '#d4f4ec',
        'accent-3': '#ffd8c5',
      },
    },
  },
  dark: {
    global: {
      colors: {
        brand: '#121212',
        'accent-1': '#3700b3',
        'accent-2': '#03dac5',
        'accent-3': '#cf6679',
      },
    },
  },
  awsmcolor: {
    global: {
      colors: {
        brand: '#25424c',
        'accent-1': '#fb770d',
        'accent-2': '#ffa45b',
        'accent-3': '#ffebdb',
      },
    },
  },
  fabulous: {
    global: {
      colors: {
        brand: '#801336',
        'accent-1': '#ee4540',
        'accent-2': '#c72c41',
        'accent-3': '#510a32',
      },
    },
  },
  monokai: {
    global: {
      colors: {
        brand: '#272822',
        'accent-1': '#f92672',
        'accent-2': '#66d9ef',
        'accent-3': '#fd971f',
      },
    },
  },
  firefly: {
    global: {
      colors: {
        brand: '#1e2328',
        'accent-1': '#f5b301',
        'accent-2': '#3b3f46',
        'accent-3': '#fed053',
      },
    },
  },
  'warn-and-bold': {
    global: {
      colors: {
        brand: '#000000',
        'accent-1': '#062f4f',
        'accent-2': '#882601',
        'accent-3': '#813772',
      },
    },
  },
  elegant: {
    global: {
      colors: {
        brand: '#0b3c5d',
        'accent-1': '#328cc1',
        'accent-2': '#d9b310',
        'accent-3': '#1d2731',
      },
    },
  },
  vibrant: {
    global: {
      colors: {
        brand: '#000000',
        'accent-1': '#ec576b',
        'accent-2': '#4ec5c1',
        'accent-3': '#e5e338',
      },
    },
  },
  natural: {
    global: {
      colors: {
        brand: '#8d8741',
        'accent-1': '#659dbd',
        'accent-2': '#daad86',
        'accent-3': '#fbeec1',
      },
    },
  },
  'cool-and-fresh': {
    global: {
      colors: {
        brand: '#05386b',
        'accent-1': '#379683',
        'accent-2': '#5cdb95',
        'accent-3': '#edf5e1',
      },
    },
  },
  audacious: {
    global: {
      colors: {
        brand: '#fc4445',
        'accent-1': '#3feee6',
        'accent-2': '#55bcc9',
        'accent-3': '#cafafe',
      },
    },
  },
  contemporary: {
    global: {
      colors: {
        brand: '#1a1a1d',
        'accent-1': '#950740',
        'accent-2': '#c3073f',
        'accent-3': '#6f2232',
      },
    },
  },
  sleek: {
    global: {
      colors: {
        brand: '#0f292f',
        'accent-1': '#501f3a',
        'accent-2': '#cb2d6f',
        'accent-3': '#14a098',
      },
    },
  },
  intrepid: {
    global: {
      colors: {
        brand: '#314455',
        'accent-1': '#c96567',
        'accent-2': '#9e5a63',
        'accent-3': '#97aabd',
      },
    },
  },
  effective: {
    global: {
      colors: {
        brand: '#faed26',
        'accent-1': '#46344e',
        'accent-2': '#5a5560',
        'accent-3': '#9b786f',
      },
    },
  },
};
