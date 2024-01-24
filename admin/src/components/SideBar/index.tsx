import {
  List,
  ListItem,
  LogOutBtn,
  Logo,
  LogoWrapper,
  Wrapper,
} from "./styles";
import { LuLogOut } from "react-icons/lu";
import logo from "../../public/Logo.png";
import { FaHome } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./style.css";
import { useLogout } from "../../hooks/useLogout";

function SideBar() {
  const { logout, isLoading } = useLogout();

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo src={logo} />
      </LogoWrapper>
      <List>
        <ListItem>
          <NavLink style={{ padding: "6px" }} to="dashboard">
            <FaHome />
          </NavLink>
          <NavLink style={{ padding: "6px" }} to="dashboard">
            Panel Główny
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink style={{ padding: "6px" }} to="users">
            <FaUsersCog />
          </NavLink>
          <NavLink style={{ padding: "6px" }} to="users">
            Użytkownicy
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink style={{ padding: "6px" }} to="recipes">
            <FaReceipt />
          </NavLink>
          <NavLink style={{ padding: "6px" }} to="recipes">
            Przepisy
          </NavLink>
        </ListItem>
      </List>
      <LogOutBtn disabled={isLoading} onClick={() => logout()}>
        Wyloguj się
        <LuLogOut />
      </LogOutBtn>
    </Wrapper>
  );
}

export default SideBar;
