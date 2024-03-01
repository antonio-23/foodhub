import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRow from "../../components/FormRow/FormRow";
import { Input } from "../../components/Input";
import { useUser } from "../../hooks/useUser";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useForm } from "react-hook-form";

interface IFormInput {
  fullName: string;
}

export default function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { register, reset, handleSubmit } = useForm<IFormInput>();

  function onSubmit({ fullName }: IFormInput) {
    updateUser({ name: fullName }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Email'>
        <Input type='email' value={user?.email} disabled />
      </FormRow>

      <FormRow label='Imię i nazwisko'>
        <Input
          type='text'
          id='fullName'
          disabled={isUpdating}
          {...register("fullName")}
        />
      </FormRow>

      <FormRow>
        <Button
          type='reset'
          variation='secondary'
          disabled={isUpdating}
          onClick={() => reset()}
        >
          Anuluj
        </Button>
        <Button disabled={isUpdating}>Zapisz</Button>
      </FormRow>
    </Form>
  );
}
