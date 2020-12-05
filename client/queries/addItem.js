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

export const GET_CATEGORIES = gql`
query get_categories {
  get_categories {
    id
    name
  }
}
`;