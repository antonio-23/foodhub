import Header from "../components/Header";
import UsersTable from "../components/UsersTable";
import { Content, Wrapper } from "./styles";

function Users() {
  return (
    <Wrapper>
      <Header label="Użytkownicy" />
      <Content>
        <UsersTable />
      </Content>
    </Wrapper>
  );
}

export default Users;
