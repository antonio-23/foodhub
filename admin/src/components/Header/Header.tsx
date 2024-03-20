import UserAvatar from "../../features/auth/UserAvatar";
import HeaderMenu from "../HeaderMenu/HeaderMenu";
import { StyledHeader } from "./styles";

export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
