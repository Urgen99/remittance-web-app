import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Input, InputProps } from "./input";
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const disabled =
      props.value === "" || props.value === undefined || props.disabled;

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "shadow-sm font-inter rounded-[8px] font-normal text-sm leading-5 text-[#7F7D83] tracking-[-0.05px] h-10 hide-password-toggle pr-2 pl-3",
            className
          )}
          placeholder="*************"
          ref={ref}
          {...props}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="cursor-pointer absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={disabled}
          title={showPassword ? "Hide Password" : "Show Password"}
        >
          {showPassword && !disabled ? (
            <EyeIcon stroke="#7F7D83" className="size-5" aria-hidden="true" />
          ) : (
            <EyeOffIcon
              stroke="#7F7D83"
              className="size-5"
              aria-hidden="true"
            />
          )}
        </Button>

        {/* hides browsers password toggles */}
        <style>
          {`
                .hide-password-toggle::-ms-reveal,
                .hide-password-toggle::-ms-clear {
                    visibility: hidden;
                    pointer-events: none;
                    display: none;

                }
          `}
        </style>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
