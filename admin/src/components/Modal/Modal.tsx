import React, { useState } from "react";
import { ButtonIcon } from "../ButtonIcon";
import { PlusOutlined } from "@ant-design/icons";
import { StyledModal } from "./styles";
import { Form } from "../Form";
import FormRow from "../FormRow/FormRow";
import { Input } from "../Input";
import Textarea from "../Textarea";
import { useForm } from "react-hook-form";
import { useAddRecipe } from "../../hooks/useAddRecipe";
import { Recipe } from "../../types/types";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const { addRecipe, isLoading } = useAddRecipe();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = (data: Recipe) => {
    addRecipe(data);
    setIsModalOpen(false);
    reset();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <ButtonIcon onClick={showModal}>
        <PlusOutlined />
      </ButtonIcon>
      <StyledModal
        open={isModalOpen}
        onOk={handleSubmit(handleOk)}
        okText='Dodaj'
        onCancel={handleCancel}
        cancelText='Anuluj'
        width={600}
      >
        <Form type='form'>
          <FormRow label='Nazwa przepisu'>
            <Input
              type='text'
              id='recipe_name'
              {...register("recipe_name")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Składniki'>
            <Input
              type='text'
              id='ingredients'
              {...register("ingredients")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Treść przepisu'>
            <Textarea
              id='content_of_recipe'
              {...register("content_of_recipe")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Czas przygotowania'>
            <Input
              type='number'
              id='preparation_time'
              {...register("preparation_time")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Liczba porcji'>
            <Input
              type='number'
              id='number_of_servings'
              {...register("number_of_servings")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Wartość kaloryczna'>
            <Input
              type='number'
              id='caloric_value'
              {...register("caloric_value")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Węglowodany'>
            <Input
              type='number'
              id='carbohydrates'
              {...register("carbohydrates")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Tłuszcze'>
            <Input
              type='number'
              id='fats'
              {...register("fats")}
              disabled={isLoading}
            />
          </FormRow>
          <FormRow label='Białko'>
            <Input
              type='number'
              id='protein'
              {...register("protein")}
              disabled={isLoading}
            />
          </FormRow>
        </Form>
      </StyledModal>
    </>
  );
};

export default App;
