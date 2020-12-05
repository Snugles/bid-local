import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
mutation create_item(
  $userId: String!,
  $item: ItemUpdate!
  ) {
  create_item(
    userId: $userId,
    item: $item
  ) {
    id,
    name,
    minPrice,
    description
  }
}
`;