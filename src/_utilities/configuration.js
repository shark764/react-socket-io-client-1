export const domain = 'localhost';

export const baseApiUrl = '/api/v1';

export const gameControllerPort = 3011;
export const wsGameControllerPort = 3011;
export const gameControllerPath = '/game-controller-server';
export const gameControllerUri = 'wss://level-up-game-controller.herokuapp.com';
// export const gameControllerUri = `ws://${domain}:${wsGameControllerPort}`;
export const httpGameControllerUri = 'https://level-up-game-controller.herokuapp.com';
// export const httpGameControllerUri = `http://${domain}:${gameControllerPort}`;

export const gameControllerConfiguration = {
  port: wsGameControllerPort,
  uri: gameControllerUri,
  path: gameControllerPath,
  httpPort: gameControllerPort,
  httpUri: httpGameControllerUri,
};

export const reportingPort = 3009;
export const wsReportingPort = 3009;
export const reportingPath = '/reporting-server';
export const reportingUri = 'wss://level-up-reporting.herokuapp.com';
// export const reportingUri = `ws://${domain}:${wsReportingPort}`;
export const httpReportingUri = 'https://level-up-reporting.herokuapp.com';
// export const httpReportingUri = `http://${domain}:${reportingPort}`;
export const apolloPort = 3009;
export const apolloUri = `http://${domain}:${apolloPort}/graphql`;
export const wsApolloUri = `ws://${domain}:${apolloPort}/subscriptions`;

export const reportingConfiguration = {
  port: wsReportingPort,
  uri: reportingUri,
  path: reportingPath,
  httpPort: reportingPort,
  httpUri: httpReportingUri,
  httpGraphqlUri: apolloUri,
  wsUri: wsApolloUri,
};

export const securityUrl = 'https://dev-lul-sec.herokuapp.com/api';
