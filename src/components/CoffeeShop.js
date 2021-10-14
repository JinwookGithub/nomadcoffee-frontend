import { Link } from "react-router-dom";
import styled from "styled-components";
import { parseCat } from "../sharedFunc";

const Container = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: green;
  width: 250px;
  height: 250px;
  margin: 5%;
`;

const SPhotoTitle = styled.h1`
  font-size: 20px;
`;

const SPhoto = styled.img`
  max-width: 65%;
  max-height: 65%;
`;

const SInfoContainer = styled.span`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export default function CoffeeShop({
  id,
  latitude,
  longitude,
  name,
  photos,
  user,
  categories,
}) {
  return (
    <Container
      to={{
        pathname: `/shop/${id}`,
        state: {
          id,
          latitude,
          longitude,
          name,
          photos,
          user,
          categories,
        },
      }}
    >
      <SPhotoTitle>{name}</SPhotoTitle>
      {photos && photos[0] && photos[0].url && <SPhoto src={photos[0].url} />}
      <SInfoContainer>
        <span>
          position {latitude},{longitude}
        </span>
        <span>category: {parseCat(categories)}</span>
        <span>created by {user.name}</span>
      </SInfoContainer>
    </Container>
  );
}
