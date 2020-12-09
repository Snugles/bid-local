import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation sign_up($email: email) {
    sign_up(email: $email, password: "pass") {
      token
    }
  }
`;
