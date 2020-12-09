import { gql } from '@apollo/client';

// export const GET_USER_BY_EMAIL = gql`
//   query get_user_by_email($email:String!) {
//     get_user_by_email (email: $email) {
//       id
//       email
//     }
//   }
// `;

export const SIGN_IN = gql`
  mutation sign_in($email:String!, $password:String!){
    sign_in(email: $email, password: $password) {
      token
    }
  }
`;

