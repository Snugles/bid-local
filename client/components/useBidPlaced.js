import { useSubscription } from '@apollo/client';
import gql from 'graphql-tag';

export const subscription = gql`
  subscription BidPlaced {
    bidPlaced {
      name
      minimunBid
    }
  }
`;

export default () => useSubscription(subscription);

