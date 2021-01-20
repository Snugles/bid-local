import { gql } from '@apollo/client';
import { useSubscription } from '@apollo/client';

export default () => useSubscription(gql`
  subscription BidPlaced {
    bidPlaced {
      name
      minimumBid
      id
      bidder
    }
  }
`);