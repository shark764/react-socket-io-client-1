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
