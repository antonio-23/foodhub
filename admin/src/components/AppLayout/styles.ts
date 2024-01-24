import styled from "styled-components";

export const OutterWrapper = styled.div`
  position: absolute;
  margin: 0;
  padding: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f1f5f9;
  border-radius: 0.8rem;
  overflow: hidden;
`;
// background-color: #e2e8f0;
export const Wrapper = styled.div`
  font-size: 1.6rem;
  width: 90vw;
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 0.5fr 7fr 0.2fr;
`;

export const SideWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
`;

export const HeaderWrapper = styled.div`
  grid-column: 2 / -1;
  grid-row: 1;
`;

export const MainContent = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  border-bottom-left-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  padding: 1.2rem;
  overflow: auto;
`;

export const Footer = styled.div`
  grid-column: 1/4;
  grid-row: 3/4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
`;
