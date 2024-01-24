import { Outlet } from "react-router-dom";
import {
  Footer,
  HeaderWrapper,
  MainContent,
  OutterWrapper,
  SideWrapper,
  Wrapper,
} from "./styles";
import SideBar from "../SideBar";

function AppLayout() {
  return (
    <OutterWrapper>
      <Wrapper>
        <SideWrapper>
          <SideBar />
        </SideWrapper>
        <HeaderWrapper></HeaderWrapper>
        <MainContent>
          <Outlet />
        </MainContent>
        <Footer>
          FoodHub &copy; {new Date().getFullYear().toLocaleString()} All rights
          reserved.
        </Footer>
      </Wrapper>
    </OutterWrapper>
  );
}

export default AppLayout;
