import { Empty } from "antd";
import { Cell, Columns, EmptyBox, TicketList, Title, Wrapper } from "./styles";

function Tickets() {
  return (
    <>
      <Title>Tickety:</Title>
      <Wrapper>
        <TicketList>
          <Columns>
            <Cell>Id</Cell>
            <Cell>Title</Cell>
            <Cell>Treść</Cell>
            <Cell>Nadawca</Cell>
            <Cell>Status</Cell>
            <Cell>Akcje</Cell>
          </Columns>
          <EmptyBox>
            <Empty description="Brak ticketów" />
          </EmptyBox>
        </TicketList>
      </Wrapper>
    </>
  );
}

export default Tickets;
