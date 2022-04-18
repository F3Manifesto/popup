import cn from "classnames";
import { FC } from "react";
import s from "./Swatch.module.scss";
import { Check } from "@components/icons";
import Button, { ButtonProps } from "@components/ui/Button";
import { isDark } from "@lib/colors";
interface Props {
  active?: boolean;
  children?: any;
  className?: string;
  label?: string;
  variant?: "size" | "color" | string;
  color?: string;
}

function lightOrDark(color: string) {
  const darkList = {
    red: "dark",
    white: "light",
    yellow: "light",
    green: "dark",
    blue: "dark",
  };

  const index = Object.keys(darkList).findIndex((item) => item === color);
  if (index < 0) return "dark";

  return Object.values(darkList)[index];
}
const Swatch: FC<Omit<ButtonProps, "variant"> & Props> = ({
  className,
  color = "",
  label,
  variant = "size",
  active,
  ...props
}) => {
  variant = variant?.toLowerCase();
  label = label?.toLowerCase();

  const rootClassName = cn(
    s.root,
    {
      [s.active]: active,
      [s.size]: variant === "size",
      [s.color]: color,
      [s.dark]: color ? isDark(color) : false,
    },
    className
  );

  // console.log("color: ", color);
  // console.log("lightOrDark(color): ", lightOrDark(color));

  return (
    <Button
      className={rootClassName}
      style={color ? { backgroundColor: color } : {}}
      aria-label="Variant Swatch"
      {...props}
    >
      {variant === "color" && active && (
        <span>
          <Check stroke={lightOrDark(color) === "dark" ? "white" : "black"} />
        </span>
      )}
      {variant === "size" ? label : null}
    </Button>
  );
};

export default Swatch;
