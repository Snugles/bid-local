import { gql } from '@apollo/client';

export const CREATE_ITEM = gql`
mutation create_item(
  $name: String!
  $minPrice: Int!
	$description: String
	$userId: String!
  $categoryId: String
  ) {
  create_item(
    name: $name,
    minPrice: $minPrice,
    description: $description,
    userId: $userId,
    categoryId: $categoryId
  ) {
    id,
    name,
    minPrice,
    description
  }
}
`;