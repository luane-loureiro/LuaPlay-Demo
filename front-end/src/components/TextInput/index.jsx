import React from "react";
import styles from "./TextInput.module.css";

export default function TextInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete = "off",
  error,
  className = "", // 👈 adicionar aqui
}) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const inputClassName = [
    styles.input,
    type === "color" ? styles.colorInput : "",
    error ? styles.errorInput : "",
    className, // 👈 incluir classe vinda do componente pai
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name || inputId}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className={inputClassName}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        data-testid={`textinput-${inputId}`}
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}