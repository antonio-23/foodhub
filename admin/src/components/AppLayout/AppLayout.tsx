import { Outlet } from "react-router-dom";
import { Container, Main, StyledAppLayout } from "./styles";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
