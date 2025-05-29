import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  style,
  disabled = false,
  ...rest // captura todas as outras props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${className}`}
      style={style}
      {...rest}  // passa todas as outras props aqui, incluindo aria-label
    >
      {children}
    </button>
  );
}
