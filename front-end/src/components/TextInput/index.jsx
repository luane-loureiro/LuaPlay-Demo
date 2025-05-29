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
}) {
  // Gera um ID confiável se não for passado
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={inputId}>
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
        className={error ? styles.errorInput : ""}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${inputId}-error` : undefined}
        data-testid={`textinput-${inputId}`} // Facilita testes
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}
