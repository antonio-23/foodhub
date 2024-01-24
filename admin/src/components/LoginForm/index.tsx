import {
  Box,
  Error,
  Form,
  FormRow,
  Input,
  Label,
  Logo,
  StyledImg,
  StyledSpan,
  SubmitBtn,
  Wrapper,
} from "./styles";
import logo from "../../public/Logo.png";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import Spinner from "../Spinner";

function LoginForm() {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { login, isLoading } = useLogin();

  function onSubmit(data: any) {
    login(data);
  }

  return (
    <Wrapper>
      <Box>
        <Logo>
          <StyledImg src={logo} />
          <StyledSpan>Panel administratora</StyledSpan>
        </Logo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormRow>
            <Label htmlFor="email">Email:</Label>
            <Input
              disabled={isLoading}
              {...register("email", {
                required: "Podanie adresu email jest wymagane!",
              })}
              type="email"
              id="email"
            />
            {errors?.email ? (
              // eslint-disable-next-line
              //@ts-ignore
              <Error>{errors?.email?.message || ""}</Error>
            ) : (
              ""
            )}
          </FormRow>
          <FormRow>
            <Label htmlFor="password">Hasło:</Label>
            <Input
              disabled={isLoading}
              {...register("password", {
                required: "Podanie hasła jest wymagane!",
                minLength: {
                  value: 5,
                  message: "Hasło musi zawierać min. 5 znaków!",
                },
              })}
              type="password"
              id="password"
            />
            {errors?.password ? (
              // eslint-disable-next-line
              //@ts-ignore
              <Error>{errors?.password?.message || ""}</Error>
            ) : (
              ""
            )}
          </FormRow>
          {isLoading ? (
            <Spinner />
          ) : (
            <SubmitBtn type="submit" value="Zaloguj" />
          )}
        </Form>
      </Box>
    </Wrapper>
  );
}

export default LoginForm;
