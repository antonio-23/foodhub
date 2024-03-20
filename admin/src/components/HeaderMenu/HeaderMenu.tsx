import { UserOutlined } from "@ant-design/icons";
import { StyledHeaderMenu } from "./styles";
import DarkModeToggle from "../DarkModeToggle";
import { ButtonIcon } from "../ButtonIcon";
import Logout from "../../features/auth/Logout";
import { useNavigate } from "react-router-dom";

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
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
