import styled from "styled-components";

export const ButtonIcon = styled.button<{ color?: string }>`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: ${(props) => props.color || "var(--color-brand-400)"};
  }
`;
