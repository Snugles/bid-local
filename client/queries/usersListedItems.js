import { gql } from '@apollo/client';

export const GET_USER_ITEMS = gql`
query get_user_by_email (
  $email: String!
) {
  get_user_by_email (
    email: $email
  ) {
    item {
      id
      name
      minimumBid
      description
      auctionEnd
    }
  }
}
`;

export const UPDATE_ITEM = gql`
mutation update_item (
  $itemId: ID!
  $item: ItemUpdate!
) {
  update_item (
    itemId: $itemId
    item: $item
  ) {
    id
    name
  }
}
`;