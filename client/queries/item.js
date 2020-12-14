import { gql } from '@apollo/client';

export const PLACE_A_BID = gql`
mutation place_a_bid (
  $itemId: ID!,
  $biddingPrice: Int
) {
  place_a_bid (
    itemId: $itemId
    biddingPrice: $biddingPrice
  ) {
    id
  }
}
`;

export const GET_ITEM_BY_ID = gql`
query  get_item_by_Id ( $id: ID! ){
  get_item_by_Id(id: $id){
    id
    name
    auctionEnd
    minimumBid
    description
    picUrl1
    picUrl2
    picUrl3
    bidder
    user {
      firstName
      lastName
      email
      phoneNumber
    }
  }
}
`;

export const GET_USER_INFO = gql`
  query get_user_info {
    get_user_info {
      id
    }
  }
`;