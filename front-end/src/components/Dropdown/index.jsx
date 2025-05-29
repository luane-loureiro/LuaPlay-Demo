import React from "react";

export default function Dropdown({ label, required = false, options = [], value, onChange, id }) {
  if (!id) {
    console.warn("O componente Dropdown precisa receber uma prop 'id' para associar o label ao select.");
  }

  return (
    <div>
      <label htmlFor={id}>
        {label} {required && <span aria-label="Campo obrigatório">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        aria-required={required}
        data-testid={`dropdown-${id}`}
      >
        <option value="">Selecione</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

