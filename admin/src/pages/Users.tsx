import { Heading } from "../components/Heading";
import { Row } from "../components/Row";
import UsersTable from "../components/UsersTable/UsersTable";

function Users() {
  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Użytkownicy</Heading>
      </Row>
      <Row>
        <UsersTable />
      </Row>
    </>
  );
}

export default Users;
