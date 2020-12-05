import { gql } from '@apollo/client';

export const GET_EMAIL = gql`
  query get_user_by_email ($email: String!) {
    get_user_by_email(email: $email) {
      id
      email
      phoneNumber
      address {
        city
        postcode
        country
      }
    }
  }
`;
