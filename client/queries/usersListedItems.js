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
      minPrice
      description
    }
  }
}
`;