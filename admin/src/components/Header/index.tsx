import { Header as H1 } from "./styles";
function Header({
  label,
}: {
  label: "Użytkownicy" | "Przepisy" | "Panel główny";
}) {
  return <H1>{label}</H1>;
}

export default Header;
