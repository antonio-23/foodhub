import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRow from "../../components/FormRow/FormRow";
import { Input } from "../../components/Input";

export default function UpdatePasswordForm() {
  return (
    <Form>
      <FormRow label='Nowe hasło (min 8 znaków)'>
        <Input type='password' id='password' autoComplete='current-password' />
      </FormRow>

      <FormRow label='Powtórz nowe hasło'>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
        />
      </FormRow>

      <FormRow>
        <Button type='reset' variation='secondary'>
          Anuluj
        </Button>
        <Button>Zapisz</Button>
      </FormRow>
    </Form>
  );
}
