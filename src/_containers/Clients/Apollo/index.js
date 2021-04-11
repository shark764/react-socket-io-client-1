import React from 'react';
import { gql, useSubscription } from '@apollo/client';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Link,
} from '@material-ui/core';
import HitList from '../../../_components/HitList';
import GraphqlSVG from '../../../_components/Logo/Graphql';

const GAME_SUBSCRIPTION = gql`
  subscription onGameCreated {
    gameCreated {
      id
      name
      createdAt
      hits {
        id
        deviceId
      }
    }
  }
`;
const HIT_SUBSCRIPTION = gql`
  subscription onHitBatch {
    hitBatch {
      id
      deviceId
      value1
      value2
      value3
      value4
      createdAt
      game {
        id
        name
        createdAt
      }
    }
  }
`;

function Apollo() {
  const gameSubscription = useSubscription(GAME_SUBSCRIPTION, {
    variables: {},
  });
  const hitSubscription = useSubscription(HIT_SUBSCRIPTION, {
    variables: {},
  });

  const hitsSummary = React.useMemo(
    () => hitSubscription?.data?.hitBatch?.map((hit) => ({
      ...hit,
      gameId: hit.game.id,
      time: hit.createdAt,
    })) || [],
    [hitSubscription.data],
  );

  return (
    <Grid item xs={12} sm={12} lg={12} xl={12}>
      <Box elevation={3} m={2} boxShadow={3} p={4}>
        <Typography variant="h4" display="inline">
          Using
          {' '}
          <Link href="https://graphql.org/learn/" target="_blank">
            Graphql
          </Link>
        </Typography>
        {' '}
        <GraphqlSVG />
        {gameSubscription.loading ? (
          <>
            <Typography color="primary">Waiting for a Game</Typography>
            <CircularProgress color="secondary" />
          </>
        ) : (
          <Typography variant="h6" gutterBottom color="secondary">
            Game ID:
            {' '}
            {gameSubscription.data.gameCreated.id}
          </Typography>
        )}
        <HitList rows={hitsSummary} />
      </Box>
    </Grid>
  );
}

export default Apollo;
