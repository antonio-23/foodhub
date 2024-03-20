import { useUser } from "../../hooks/useUser";
import { Avatar, StyledUserAvatar } from "./styles";

export default function UserAvatar() {
  const { user } = useUser();
  const { name = "User" } = user?.user_metadata ?? {};

  return (
    <StyledUserAvatar>
      <Avatar src='default-user.jpg' alt='Avatar' />
      <span>{name}</span>
    </StyledUserAvatar>
  );
}
