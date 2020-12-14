import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query get_user_info {
    get_user_info {
      id
      email
      phoneNumber
      address {
        id
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
  $user: UserUpdate!
) {
  update_user (
    user: $user
  ){
    id
    phoneNumber
    email
  }
}
`;

export const UPDATE_ADDRESS = gql`
mutation update_address(
    $addressId:ID!
    $address:AddressUpdate!
  ) {
    update_address (
      addressId: $addressId
      address: $address
    ){
      firstLineAddress
      secondLineAddress
      city
      postcode
      country
    }
}
`;
