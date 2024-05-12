"use client";

import DocumentTypeSelect from "./DocumentTypeSelect";
import Image from "next/image";
import SearchSvg from "../../public/search-svgrepo-com.svg";

import {
  TITLES,
  BUTTON_LABELS,
  ROUTES,
  INPUT_LABELS,
  DOCUMENT_TYPE_OPTIONS,
} from "../constants";
import Link from "next/link";
import Divider from "./Divider";
import Input from "./Input";
import { useEffect, useState } from "react";
import { fetchPersonas } from "@/redux/Slices/PersonaSlice";
import { useAppDispatch } from "@/hooks";
import {
  getLastUsedFilters,
  setLastFiltersUsed,
} from "@/redux/Slices/FilterSlice";
import { useSelector } from "react-redux";
import { validacionNombres } from "@/utils";

const FilterControls: React.FC = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [docTypeFilter, setDocTypeFilter] = useState(
    DOCUMENT_TYPE_OPTIONS.TODAS
  );

  const lastUsedFilters = useSelector(getLastUsedFilters);

  useEffect(() => {
    if (
      lastUsedFilters.nameFilter !== nameFilter ||
      lastUsedFilters.docTypeFilter !== docTypeFilter
    ) {
      setNameFilter(lastUsedFilters.nameFilter);
      setDocTypeFilter(lastUsedFilters.docTypeFilter);
    }
  }, [lastUsedFilters]);

  const dispatch = useAppDispatch();

  const getPersonas = () => {
    dispatch(setLastFiltersUsed({ nameFilter, docTypeFilter }));
    dispatch(fetchPersonas({ nameFilter, docTypeFilter }));
  };

  return (
    <div className="control-section">
      <div className="control-header">
        <div className="text-6xl">{TITLES.MAIN}</div>
        <Link href={ROUTES.PERSONA}>
          <button className="nuevo-button">{BUTTON_LABELS.NEW}</button>
        </Link>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="text-4xl">{TITLES.FILTERS}</div>
        <Divider />
        <div className="filters-section">
          <Input
            label={INPUT_LABELS.NAME}
            value={nameFilter}
            onChange={(e) => {
              const { value } = e.target;
              if (validacionNombres(value)) setNameFilter(value);
            }}
          />
          <DocumentTypeSelect
            value={docTypeFilter}
            searchValue={true}
            onChange={(e) => setDocTypeFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-end">
        <button className="buscar-button" onClick={getPersonas}>
          <Image
            src={SearchSvg}
            width={20}
            height={20}
            alt="search"
            className="text-white"
          />
          {BUTTON_LABELS.SEARCH}
        </button>
      </div>
    </div>
  );
};

export default FilterControls;
