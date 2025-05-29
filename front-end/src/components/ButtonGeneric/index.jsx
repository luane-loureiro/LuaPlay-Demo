import styles from "./Button.module.css";
import clsx from "clsx";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  style,
  disabled = false,
  variant = "default", 
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        styles.button,
        variant === "playlist" && styles.playlistButton,
        variant === "icon" && styles.iconButton,
        className
      )}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
