import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRow from "../../components/FormRow/FormRow";
import { Input } from "../../components/Input";

export default function UpdateUserDataForm() {
  return (
    <Form>
      <FormRow label='Email'>
        <Input type='email' />
      </FormRow>

      <FormRow label='Imię i nazwisko'>
        <Input type='text' id='fullName' />
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
