import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

type Props = {
  placeholder: string;
  icon: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const IconInput = React.forwardRef<HTMLInputElement, Props>(
  ({ placeholder, icon, ...props }, ref) => {
    return (
      <InputGroup>
        <InputGroupAddon>{icon}</InputGroupAddon>
        <InputGroupInput
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
      </InputGroup>
    );
  }
);