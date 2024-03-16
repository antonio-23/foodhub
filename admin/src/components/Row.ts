import styled, { css } from "styled-components";

export const Row = styled.div<{ type?: string }>`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}

  ${(props) =>
    props.type === "center" &&
    css`
      justify-content: center;
      align-items: center;
      margin: 1rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};
