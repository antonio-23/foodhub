import React from "react";
import { Error, Label, StyledFormRow } from "./styles";

export default function FormRow({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <StyledFormRow>
      <Label>{label}</Label>
      {children}
      <Error>{error}</Error>
    </StyledFormRow>
  );
}
