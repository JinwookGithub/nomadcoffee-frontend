import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import CoffeeShop from "../components/CoffeeShop";

const SEE_COFFEESHOPS = gql`
  query seeCoffeeShops($page: Int!) {
    seeCoffeeShops(page: $page) {
      coffeeShops {
        id
        name
        latitude
        longitude
        categories {
          name
        }
        user {
          name
        }
        photos {
          url
        }
      }
      totalPages
    }
  }
`;

const PhotoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2%;
  /* background-color: lightskyblue; */
  height: 80vh;
  margin: 0 auto;
  max-width: 1000px;
`;

const SPageIndicator = styled.span`
  display: block;
  margin: 1vh auto;
  font-size: 20px;
  text-align: center;
`;

const SIcon = styled.i`
  cursor: pointer;
`;

function Home() {
  const [page, setPage] = useState(1);
  const nextPage = max => {
    setPage(prev => (max && prev < max ? prev + 1 : prev));
  };
  const prevPage = () => {
    setPage(prev => (prev > 1 ? prev - 1 : prev));
  };
  const { data } = useQuery(SEE_COFFEESHOPS);
  return (
    <>
      <PhotoContainer>
        {data?.seeCoffeeShops?.coffeeShops?.map(
          coffeeShop =>
            coffeeShop && <CoffeeShop key={coffeeShop.id} {...coffeeShop} />,
        )}
      </PhotoContainer>
      <SPageIndicator>
        <SIcon onClick={prevPage}>←</SIcon> page {page} /{" "}
        {data?.seeCoffeeShops?.totalPages}{" "}
        <SIcon onClick={() => nextPage(data?.seeCoffeeShops?.totalPages)}>
          →
        </SIcon>
      </SPageIndicator>
    </>
  );
}
export default Home;
