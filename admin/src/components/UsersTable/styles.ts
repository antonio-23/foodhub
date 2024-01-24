import styled from "styled-components";

interface CellProps {
  width: string;
}
export const TableWrapper = styled.div`
  width: 98%;
  border: #fb923c solid 2px;
  border-radius: 12px;
  overflow: hidden;
  height: 420px;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid grey;
  height: 4.2rem;
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: all 0.1s;
  &:hover {
    background-color: #fff7ed;
    transform: scale(1.005);
    color: #c2410c;
  }
`;

export const HeaderTitle = styled.p<CellProps>`
  width: ${(props) => props.width};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Cell = styled.div<CellProps>`
  height: 36px;
  display: flex;
  width: ${(props) => props.width || "0px"};
  justify-content: center;
  align-items: center;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 2%;
  margin-bottom: 1%;
`;

export const Pagination = styled.div`
  margin-top: 0.6rem;
  font-size: 18px;
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
`;

export const Action = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 6px;
  border: 2px solid grey;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
export const PaginationButton = styled.button``;

export const PaginationCurrentPage = styled.p``;

export const SpinnerBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30rem;
`;
