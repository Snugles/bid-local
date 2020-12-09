import { gql } from '@apollo/client';

export const WON_ITEM_LIST = gql`
query won_item_list {
  won_item_list {
    id
    name
    minimumBid
    user {
      firstName
      lastName
      phoneNumber
      address {
        firstLineAddress
        secondLineAddress
        city
        postcode
        country
      }
    }
  }
}
`;

export const DELETE_ITEM = gql`
mutation delete_item_by_id (
  $itemId: ID!
) {
  delete_item_by_id (
    itemId: $itemId
  )
}
`;