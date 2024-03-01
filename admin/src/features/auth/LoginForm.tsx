import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRowVertical from "../../components/FormRowVertical/FormRowVertical";
import { Input } from "../../components/Input";
import { useLogin } from "../../hooks/useLogin";
import { useForm } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}
export default function LoginForm() {
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  function onSubmit({ email, password }: IFormInput) {
    login(
      { email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label='Email'>
        <Input
          placeholder='Email'
          type='email'
          id='email'
          autoComplete='username'
          disabled={isLoading}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Nie poprawny adres email!",
            },
          })}
        />
      </FormRowVertical>
      <FormRowVertical label='Hasło'>
        <Input
          placeholder='Hasło'
          type='password'
          autoComplete='current-password'
          disabled={isLoading}
          {...register("password", {
            required: true,
            minLength: {
              value: 6,
              message: "Hasło musi zawierać 6 znaków",
            },
          })}
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
