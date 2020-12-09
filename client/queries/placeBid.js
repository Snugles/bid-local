import { gql } from '@apollo/client';

export const PLACE_BID = gql`
mutation place_a_bid(
  $itemId: ID!,
  $userId: ID!,
  $biddingPrice:Int!
  ) {
  place_a_bid(
    userId: $userId,
    itemId: $itemId,
    biddingPrice:$biddingPrice,
  ) {
    minimumBid{
      user {
        email
      }
    }
  }
}
`;