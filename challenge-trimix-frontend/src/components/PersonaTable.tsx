"use client";
import { ROWS_PER_PAGE, TABLE_COLUMNS, TABLE_STATES } from "@/constants";
import PersonaItem from "./PersonaItem";
import { useSelector } from "react-redux";
import {
  fetchPersonas,
  getPersonasStatus,
  selectAllPersonas,
} from "@/redux/Slices/PersonaSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks";
import Image from "next/image";
import LoaderSpinner from "../../public/LoaderSpinner.gif";
import EmptyState from "../../public/sad-square-svgrepo-com.svg";
import {
  getLastUsedFilters,
  getTablePaginationFilters,
  setPage,
  setSize,
} from "@/redux/Slices/FilterSlice";

const PersonaTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const personas = useSelector(selectAllPersonas);
  const status = useSelector(getPersonasStatus);
  const lastUsedFilters = useSelector(getLastUsedFilters);
  const { page, size, total } = useSelector(getTablePaginationFilters);
  const startIndex = () => (page - 1) * size + 1;
  const endIndex = () => Math.min(page * size, total);

  useEffect(() => {
    dispatch(fetchPersonas({ ...lastUsedFilters, page, size, total })); //realizar una primera busqueda para todos los registros
  }, [size, page]);

  const renderTable = () => {
    if (status === "loading" || status === "idle") {
      return (
        <div className="flex flex-col items-center" data-testid="loading-state">
          <Image src={LoaderSpinner} priority alt="loader-spinner" />
          <div className="text-3xl mt-2">{TABLE_STATES.loading}</div>
        </div>
      );
    } else if (personas.length === 0 && status === "success") {
      return (
        <div className="flex flex-col items-center" data-testid="empty-state">
          <Image src={EmptyState} priority alt="empty-icon" height={400} />
          <div className="text-3xl mt-2">{TABLE_STATES.emptyState.title}</div>
          <div className="text-xl mt-2">{TABLE_STATES.emptyState.body}</div>
        </div>
      );
    } else if (status === "failure") {
      return (
        <div className="flex flex-col items-center" data-testid="api-failure">
          <Image src={EmptyState} priority alt="empty-icon" height={400} />
          <div className="text-3xl mt-2">{TABLE_STATES.apiFailure.title}</div>
          <div className="text-xl mt-2">{TABLE_STATES.apiFailure.body}</div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-fit">
          <table className="w-full h-fit">
            <thead className="border-b-2 border-white">
              <tr>
                <th>{TABLE_COLUMNS.ID}</th>
                <th>{TABLE_COLUMNS.NAME}</th>
                <th>{TABLE_COLUMNS.SURNAME}</th>
                <th>{TABLE_COLUMNS.DOCNUMBER}</th>
                <th>{TABLE_COLUMNS.DOCTYPE}</th>
                <th>{TABLE_COLUMNS.BIRTHDATE}</th>
              </tr>
            </thead>
            <tbody data-testid="table-body">
              {personas.map(
                (persona: Persona, index: number) =>
                  index < size && <PersonaItem key={persona.id} {...persona} />
              )}
            </tbody>
          </table>
          <div className="flex text-xl justify-center gap-[5%] items-center border-t-2 border-white pt-3">
            <div className="flex items-center">
              <div>{ROWS_PER_PAGE}</div>
              <select
                name="filas-x-pag"
                className="rounded-md ml-1"
                value={size}
                onChange={(e) => dispatch(setSize(e.target.value))}
              >
                <option value={"5"}>5</option>
                <option value={"10"}>10</option>
                <option value={"15"}>15</option>
              </select>
            </div>
            <div className="flex gap-2 items-center">
              <div>{`${startIndex()}-${endIndex()} de ${total}`}</div>
              <div className="flex gap-2">
                <button
                  className="arrow-page-button"
                  onClick={() => dispatch(setPage(page - 1))}
                  disabled={page === 1}
                >
                  {`<`}
                </button>
                <button
                  className="arrow-page-button"
                  onClick={() => dispatch(setPage(page + 1))}
                  disabled={total === endIndex()}
                >
                  {`>`}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="persona-table justify-center" data-testid="table-persona">
      {renderTable()}
    </div>
  );
};

export default PersonaTable;
