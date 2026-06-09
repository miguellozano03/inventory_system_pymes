import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Lock, Eye, EyeOff } from "lucide-react";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    const [show, setShow] = useState(false);

    return (
      <InputGroup>
        <InputGroupAddon>
          <Lock size={16} />
        </InputGroupAddon>
        <div className="relative flex-1">
          <InputGroupInput
            ref={ref}
            type={show ? "text" : "password"}
            className="pr-10"
            {...props}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </InputGroup>
    );
  },
);
