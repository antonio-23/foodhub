import { useState } from "react";
import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRowVertical from "../../components/FormRowVertical/FormRowVertical";
import { Input } from "../../components/Input";
import { useLogin } from "../../hooks/useLogin";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label='Email'>
        <Input
          placeholder='Email'
          type='email'
          id='email'
          autoComplete='username'
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label='Hasło'>
        <Input
          placeholder='Hasło'
          type='password'
          autoComplete='current-password'
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size='large' disabled={isLoading}>
          Zaloguj się
        </Button>
      </FormRowVertical>
    </Form>
  );
}
