import Charts from "../components/Charts";
import Header from "../components/Header";
import Tickets from "../components/Tickets";
import { Content, Wrapper } from "./styles";

function Dashboard() {
  return (
    <Wrapper>
      <Header label="Panel główny" />
      <Content>
        <Charts />
        <Tickets />
      </Content>
    </Wrapper>
  );
}

export default Dashboard;
