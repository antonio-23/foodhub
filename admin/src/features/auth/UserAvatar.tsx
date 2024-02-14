import { Avatar, StyledUserAvatar } from "./styles";

export default function UserAvatar() {
  return (
    <StyledUserAvatar>
      <Avatar src='default-user.jpg' alt='Avatar' />
      <span>Robert</span>
    </StyledUserAvatar>
  );
}
