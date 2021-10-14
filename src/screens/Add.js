import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import CreateShopForm from "../components/CreateShopForm";
import { Title } from "../components/shared";
import { COFFEESHOP_FRAGMENT } from "../fragments";

const CREATE_COFFEESHOP = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]!
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photos: $photos
      categories: $categories
    ) {
      ...CoffeeShopFragment
    }
  }
  ${COFFEESHOP_FRAGMENT}
`;

const Container = styled.div`
  display: flex;
  margin-top: 10vh;
  flex-direction: column;
  align-items: center;
  /* max-width: 60%; */
`;

export default function Add() {
  const history = useHistory();
  const { register, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  });
  const onCompleted = data => {
    if (data.createCoffeeShop?.id) {
      history.push("/");
    }
  };
  const [createCoffeeShop, { loading }] = useMutation(CREATE_COFFEESHOP, {
    onCompleted,
  });
  const onSubmitValid = data => {
    if (loading) {
      return;
    }
    if (data) {
      const { name, latitude, longitude, photos, categories } = getValues();
      console.log(photos);
      createCoffeeShop({
        variables: {
          name,
          latitude,
          longitude,
          photos,
          categories,
        },
      });
    }
  };
  return (
    <Container>
      <Title>Enroll your new Coffee Shop</Title>
      <CreateShopForm
        loading={loading}
        onSubmitValid={onSubmitValid}
        register={register}
        handleSubmit={handleSubmit}
        formState={formState}
        buttonName="Enroll"
        photoRequired={true}
      />
    </Container>
  );
}
