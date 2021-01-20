import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation sign_in($email:String!, $password:String!){
    sign_in(email: $email, password: $password) {
      token
    }
  }
`;

