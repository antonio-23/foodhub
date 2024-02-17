import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRowVertical from "../../components/FormRowVertical/FormRowVertical";
import { Input } from "../../components/Input";

export default function LoginForm() {
  return (
    <Form>
      <FormRowVertical label='Email'>
        <Input
          placeholder='Email'
          type='email'
          id='email'
          autoComplete='username'
        />
      </FormRowVertical>
      <FormRowVertical label='Hasło'>
        <Input
          placeholder='Hasło'
          type='password'
          autoComplete='current-password'
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size='large'>Zaloguj się</Button>
      </FormRowVertical>
    </Form>
  );
}
