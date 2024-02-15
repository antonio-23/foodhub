import { UserOutlined } from "@ant-design/icons";
import { StyledHeaderMenu } from "./styles";
import DarkModeToggle from "../DarkModeToggle";
import { ButtonIcon } from "../ButtonIcon";
import Logout from "../../features/auth/Logout";

export default function HeaderMenu() {
  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon>
          <UserOutlined />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
