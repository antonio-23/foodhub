import { useDarkMode } from "../../context/DarkModeContext";
import { Img, StyledLogo } from "./styles";

export default function Logo() {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={isDarkMode ? "logo-light.png" : "logo-dark.png"} alt='Logo' />
    </StyledLogo>
  );
}
