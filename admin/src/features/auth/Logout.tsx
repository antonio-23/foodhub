import { ButtonIcon } from "../../components/ButtonIcon";
import { LogoutOutlined } from "@ant-design/icons";
import { useLogout } from "../../hooks/useLogout";
import SpinnerMini from "../../components/SpinnerMini";
import { MouseEventHandler } from "react"; // Import MouseEventHandler

export default function Logout() {
  const { logout, isLoading } = useLogout();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    logout();
  };

  return (
    <ButtonIcon onClick={handleClick} disabled={isLoading}>
      {!isLoading ? <LogoutOutlined /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
