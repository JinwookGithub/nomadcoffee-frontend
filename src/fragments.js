import { gql } from "@apollo/client";

export const COFFEESHOP_FRAGMENT = gql`
  fragment CoffeeShopFragment on CoffeeShop {
    id
    name
    latitude
    longitude
    user {
      id
      name
      avatarURL
    }
    photos {
      id
      url
    }
    categories {
      id
      name
    }
  }
`;

export const SEE_COFFEESHOPS_FRAGMENT = gql`
  fragment SeeCoffeeShopsFragment on Result {
    coffeeShops {
      ...CoffeeShopFragment
    }
    totalPages
  }
  ${COFFEESHOP_FRAGMENT}
`;
