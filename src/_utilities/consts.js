export const domain = 'localhost';

export const rpbffApolloPort = 3009;
export const rpbffApolloHttpUri = `http://${domain}:${rpbffApolloPort}/graphql`;
export const rpbffApolloWsUri = `ws://${domain}:${rpbffApolloPort}/subscriptions`;

export const gcSocketIOPort = 3010;
export const gcSocketIOPath = '/game-controller-socket.io';
export const gcSocketIOUri = `http://${domain}:${gcSocketIOPort}`;

export const rpbffSocketIOPort = 4005;
export const rpbffSocketIOPath = '/reporting-bff-socket.io';
export const rpbffSocketIOUri = `http://${domain}:${rpbffSocketIOPort}`;

// eslint-disable-next-line max-len
export const socketToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
