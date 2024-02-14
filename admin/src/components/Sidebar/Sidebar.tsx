import { StyledSidebar } from "./styles";
import Logo from "../Logo/Logo";
import MainNav from "../MainNav/MainNav";

export default function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}
