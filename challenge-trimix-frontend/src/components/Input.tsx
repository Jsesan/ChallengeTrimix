"use client";

import { ChangeEventHandler, FormEventHandler } from "react";
import ErrorInput from "./ErrorInput";

type InputProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  showError?: boolean;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { label, value, onChange, showError = false } = props;
  return (
    <label className="flex flex-col text-2xl gap-1">
      {label}
      <input
        type={"text"}
        placeholder={`${label}...`}
        className="p-1 rounded-md"
        onChange={onChange}
        value={value}
      />
      {showError && <ErrorInput label={label} />}
    </label>
  );
};

export default Input;
