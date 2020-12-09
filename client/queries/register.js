import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation {
    sign_up(email: "mooming91266@gmail.com", password: "pass") {
      token
    }
  }
`;
