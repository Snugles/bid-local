import { gql } from '@apollo/client';

export const GET_USER_ITEMS = gql`
query get_user_info {
    get_user_info {
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
    description
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