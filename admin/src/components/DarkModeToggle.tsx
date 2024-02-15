import { ButtonIcon } from "./ButtonIcon";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <SunOutlined /> : <MoonOutlined />}
    </ButtonIcon>
  );
}
