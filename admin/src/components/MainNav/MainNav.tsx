import { NavList, StyledNavLink } from "./styles";
import { BookOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

export default function MainNav() {
  return (
    <NavList>
      <li>
        <StyledNavLink to='/dashboard'>
          <HomeOutlined />
          <span>Strona główna</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to='/recipes'>
          <BookOutlined />
          <span>Przepisy</span>
        </StyledNavLink>
      </li>
      <li>
        <StyledNavLink to='/users'>
          <UserOutlined />
          <span>Użytkownicy</span>
        </StyledNavLink>
      </li>
    </NavList>
  );
}
