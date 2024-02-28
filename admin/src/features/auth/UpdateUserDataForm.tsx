import { useState } from "react";
import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRow from "../../components/FormRow/FormRow";
import { Input } from "../../components/Input";
import { useUser } from "../../hooks/useUser";
import { useUpdateUser } from "../../hooks/useUpdateUser";

export default function UpdateUserDataForm() {
  const { user } = useUser();
  // const {
  //   user: {
  //     email,
  //     user_metadata: { name },
  //   },
  // } = useUser();

  const [fullName, setFullName] = useState("");
  const { updateUser, isUpdating } = useUpdateUser();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!fullName) return;

    updateUser(
      { name: fullName },
      {
        onSuccess: () => {
          event.target.reset();
        },
      }
    );
  }

  return (
    <Form onClick={handleSubmit}>
      <FormRow label='Email'>
        <Input type='email' value={user?.email} disabled />
      </FormRow>

      <FormRow label='Imię i nazwisko'>
        <Input
          type='text'
          id='fullName'
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow>
        <Button type='reset' variation='secondary' disabled={isUpdating}>
          Anuluj
        </Button>
        <Button disabled={isUpdating}>Zapisz</Button>
      </FormRow>
    </Form>
  );
}
