import styled from "styled-components";
import Logo from "../components/Logo/Logo";
import { Heading } from "../components/Heading";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Zaloguj się na swoje konto</Heading>
    </LoginLayout>
  );
}

export default Login;
