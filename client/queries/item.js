import { gql } from '@apollo/client';

export const GET_ITEM_BY_ID = gql`
query  get_item_by_Id ( $id: ID! ){
  get_item_by_Id(id: $id){
    id
    name
    minPrice
    description
    user {
      firstName
      lastName
      email
      phoneNumber
    }
  }
}
`;