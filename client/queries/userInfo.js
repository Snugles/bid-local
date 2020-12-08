import { gql } from '@apollo/client';

export const GET_EMAIL = gql`
  query get_user_by_email ($email: String!) {
    get_user_by_email(email: $email) {
      id
      email
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
`;

export const UPDATE_USER = gql`
mutation update_user (
  $userId: ID!
  $user: UserUpdate!
) {
  update_user (
    userId: $userId
    user: $user
  ){
    id
    phoneNumber
    address{
      firstLineAddress
      secondLineAddress
      city
      postcode
      country
    }
    email
  }
}
`;
