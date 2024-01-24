import styled from "styled-components";

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  color: #57534e;
  position: relative;
`;

export const Logo = styled.img`
  max-width: 14rem;
`;

export const LogoWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
`;

export const List = styled.ul`
  display: flex;
  list-style: none;
  flex-direction: column;
  padding: 1.2rem;
  align-items: center;
`;

export const ListItem = styled.li`
  text-decoration: none;
  height: 4.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: space-between;
  &:hover {
    transform: scale(1.02);
    color: #292524;
    font-weight: 500;
  }
`;

export const LogOutBtn = styled.button`
  position: absolute;
  bottom: 3.2rem;
  font-size: 1.6rem;
  left: 50%;
  transform: translate(-50%);
  background-color: #fff;
  border-radius: 0.4rem;
  width: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
  padding: 6px 12px 6px 12px;
  color: black;
  &:hover {
    cursor: pointer;
    background-color: #9ea2a8;
  }
`;
