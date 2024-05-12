"use client";

import { ChangeEventHandler, FormEventHandler } from "react";
import ErrorInput from "./ErrorInput";
import { obtenerFechaMaxima } from "@/utils";

type InputProps = {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  showError: boolean;
};

const DateInput: React.FC<InputProps> = (props: InputProps) => {
  const { label, value, onChange, showError = false } = props;
  return (
    <label className="flex flex-col text-2xl gap-1">
      {label}
      <input
        type={"date"}
        placeholder={`${label}...`}
        className="p-1 rounded-md"
        onChange={onChange}
        value={value}
        min={"1920-01-01"}
        max={obtenerFechaMaxima()}
      />
      {showError && <ErrorInput label={label} />}
    </label>
  );
};

export default DateInput;
