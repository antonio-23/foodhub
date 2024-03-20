import React from "react";
import { Error, Label, StyledFormRow } from "./styles";

export default function FormRowVertical({
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
      {label && (
        <Label htmlFor={(children as React.ReactElement)?.props?.id}>
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}
