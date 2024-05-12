"use client";

import { DOCUMENT_TYPE_OPTIONS, INPUT_LABELS } from "@/constants";
import { ChangeEventHandler } from "react";
import ErrorInput from "./ErrorInput";

type DocumentTypeSelectProps = {
  value: string;
  searchValue?: boolean;
  showError?: boolean;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = (
  props: DocumentTypeSelectProps
) => {
  const {
    value = "",
    onChange,
    searchValue = false,
    showError = false,
  } = props;
  return (
    <label className="flex flex-col text-2xl gap-1">
      {INPUT_LABELS.DOCTYPE}
      <select
        name="tipo-documento"
        className="p-1 rounded-md"
        value={value}
        onChange={onChange}
      >
        <option value="" hidden disabled>
          {DOCUMENT_TYPE_OPTIONS.PLACEHOLDER}
        </option>
        <option value="Dni">{DOCUMENT_TYPE_OPTIONS.DNI}</option>
        <option value="Pasaporte">{DOCUMENT_TYPE_OPTIONS.PASAPORTE}</option>
        <option value="Cedula">{DOCUMENT_TYPE_OPTIONS.CEDULA}</option>
        <option value="Todas" disabled={!searchValue} hidden={!searchValue}>
          {DOCUMENT_TYPE_OPTIONS.TODAS}
        </option>
      </select>
      {showError && <ErrorInput label={INPUT_LABELS.DOCTYPE} />}
    </label>
  );
};

export default DocumentTypeSelect;
