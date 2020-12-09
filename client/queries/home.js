import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
query get_categories {
  get_categories {
    id
    name
  }
}
`;

export const GET_ITEMS = gql`
query get_items {
  get_items {
    id
    name
    minimumBid
    picUrl1
    auctionEnd
    category {
      name
    }
  }
}
`;