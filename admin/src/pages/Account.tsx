import { Heading } from "../components/Heading";
import { Row } from "../components/Row";
import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";
import UpdateUserDataForm from "../features/auth/UpdateUserDataForm";

export default function Account() {
  return (
    <>
      <Heading as='h1'>Uaktualnij konto</Heading>
      <Row>
        <Heading as='h3'>Uaktualnij dane osobowe</Heading>
        <UpdateUserDataForm />
      </Row>
      <Row>
        <Heading as='h3'>Uaktualnij zmień hasło</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}
