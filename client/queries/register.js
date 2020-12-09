import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation sign_up($user: UserUpdate!) {
    sign_up(user: $user) {
      token
    }
  }
`;
