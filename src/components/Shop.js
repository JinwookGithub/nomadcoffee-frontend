import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { Title } from "./shared";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import CreateShopForm from "./CreateShopForm";
import { useForm } from "react-hook-form";
import { parseCat } from "../sharedFunc";

const DELETE_COFFEESHOP = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      ok
      error
    }
  }
`;

const EDIT_COFFEESHOP = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categoryNames: [String]
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categoryNames: $categoryNames
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 6vh;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70vw;
`;

const Placeholder = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80px;
`;

const SPhoto = styled.img`
  height: 45vh;
  max-width: 250px;
`;

const Button = styled.span`
  width: 70px;
  cursor: pointer;
`;

const PhotoContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 70vw;
  img {
    margin: 0 5px;
  }
`;

export default function Shop() {
  const { id, latitude, longitude, name, photos, user, categories } =
    useLocation()?.state;
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      latitude,
      longitude,
      name,
      categories: parseCat(categories),
    },
    mode: "onChange",
  });
  const history = useHistory();
  const [editForm, setEditForm] = useState(false);
  const toggleEditForm = () => {
    setEditForm(prev => !prev);
  };
  const onCompleted = data => {
    if (data.deleteCoffeeShop.ok) {
      history.push("/");
    }
  };
  const [deleteCoffeeShop] = useMutation(DELETE_COFFEESHOP, { onCompleted });
  const handleDelete = () => {
    deleteCoffeeShop({ variables: { id } });
  };
  const onEditCompleted = data => {
    if (data.editCoffeeShop.ok) {
      alert("Edited!");
      history.push("/");
    } else {
      console.log(data.editCoffeeShop.error);
    }
  };
  const [editCoffeeShop, { loading }] = useMutation(EDIT_COFFEESHOP, {
    onCompleted: onEditCompleted,
  });
  const onSubmitValid = data => {
    if (loading) {
      return;
    }
    if (data) {
      const categoryNames = data.categories.split(", ");
      editCoffeeShop({ variables: { id, ...data, categoryNames } });
    } else {
    }
  };
  return (
    <>
      <Container>
        <TopContainer>
          <Placeholder />
          <Title>{name}</Title>
          <Placeholder>
            <Button onClick={() => toggleEditForm()}>
              <FontAwesomeIcon icon={faEdit} size="2x" />
            </Button>
            <Button onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} size="2x" />
            </Button>
          </Placeholder>
        </TopContainer>
        <PhotoContainer>
          {photos?.map(
            (photo, index) =>
              photo?.url && <SPhoto key={index} src={photo?.url} />,
          )}
        </PhotoContainer>
        <span>
          at {latitude},{longitude}
        </span>
        <span>category: {parseCat(categories)}</span>
        <span>by {user.name}</span>
        {editForm && (
          <div>
            <CreateShopForm
              loading={loading}
              onSubmitValid={onSubmitValid}
              register={register}
              handleSubmit={handleSubmit}
              formState={formState}
              buttonName="Edit"
              photoRequired={false}
            />
          </div>
        )}
      </Container>
    </>
  );
}
