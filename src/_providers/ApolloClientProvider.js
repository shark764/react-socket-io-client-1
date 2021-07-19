import React from 'react';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  split,
  HttpLink,
} from '@apollo/client';
import PropTypes from 'prop-types';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { apolloUri, wsApolloUri } from '../_utilities/configuration';

const httpLink = new HttpLink({
  uri: apolloUri,
});

const wsLink = new WebSocketLink({
  uri: wsApolloUri,
  options: {
    reconnect: true,
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  },
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: splitLink,
  cache,
});

function ApolloClientProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

ApolloClientProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApolloClientProvider;
