import { Modal } from "antd";
import styled from "styled-components";

export const StyledModal = styled(Modal)`
  && {
    .ant-btn-primary {
      background-color: var(--color-brand-400);
      color: var(--color-grey-800) !important;

      &:hover,
      &:focus {
        background-color: var(--color-brand-500);
        color: var(--color-grey-800) !important;
      }
    }

    .ant-btn {
      color: var(--color-brand-400);
      border-color: var(--color-brand-400);
      color: var(--color-brand-400);

      &:hover,
      &:focus {
        border-color: var(--color-brand-500);
        color: var(--color-brand-500);
      }
    }

    .ant-modal-content {
      background-color: var(--color-grey-0);
      color: var(--color-grey-800);
    }

    .ant-modal-header {
      background-color: var(--color-grey-0);
      color: var(--color-grey-0);
    }
  }
`;
