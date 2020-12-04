import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query get_users {
    get_users {
      id
      firstName
      lastName
      email
      password
    }
  }
`;
