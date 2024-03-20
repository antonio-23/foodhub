import styled, { css } from "styled-components";

export const Form = styled.form<{ type?: string }>`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "form" &&
    css`
      padding: 2.4rem 4rem;
      background-color: var(--color-grey-0);
      border-radius: var(--border-radius-md);
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};
