import styled from "styled-components";
import Button from "./auth/Button";
import Input from "./auth/Input";

const SCreateShopForm = styled.form`
  max-width: 35%;
  margin: auto;
  padding-top: 10vh;
`;

export default function CreateShopForm({
  loading,
  onSubmitValid,
  register,
  handleSubmit,
  formState,
  buttonName,
  photoRequired,
}) {
  return (
    <SCreateShopForm onSubmit={handleSubmit(onSubmitValid)}>
      <Input
        {...register("name", {
          required: "CoffeeShop is required.",
          minLength: {
            value: 2,
            message: "CoffeeShop should be longer than 2 chars.",
          },
        })}
        type="text"
        placeholder="CoffeeShop name"
      />
      <Input
        {...register("latitude", { required: "Latitude is required." })}
        type="text"
        placeholder="Latitude"
      />
      <Input
        {...register("longitude", { required: "Longitude is required." })}
        type="text"
        placeholder="Longitude"
      />
      <Input
        {...register("categories", { required: "Categories is required." })}
        type="text"
        placeholder="Categories"
      />
      <Input
        {...register("photos", {
          required: photoRequired ? "Photos is required." : false,
        })}
        type="file"
        accept="image/*"
        placeholder="Photos"
        multiple
      />
      <Button
        type="submit"
        value={loading ? "Loading..." : buttonName}
        disabled={!formState.isValid || loading}
      />
    </SCreateShopForm>
  );
}
