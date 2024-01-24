import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
`;

export const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 1.6rem;
`;

export const TicketList = styled.div`
  width: 80%;
  border: 2px solid #fb923c;
  border-radius: 6px;
  background-color: #fff;
  justify-items: center;
  align-items: center;
`;

export const Columns = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid grey;
  padding: 0.8rem;
`;

export const Cell = styled.p`
  width: 12rem;
  border-right: 1px solid;
  &:last-child {
    border-right: none;
  }
`;

export const EmptyBox = styled.div``;
