import { createSlice } from "@reduxjs/toolkit";

export type FilerState = {
  searchFilters: {
    nameFilter: string;
    docTypeFilter: string;
  };
  tableFilters: {
    page: number;
    size: number;
    total: number;
  };
};

const initialState: FilerState = {
  searchFilters: { nameFilter: "", docTypeFilter: "Todas" },
  tableFilters: { page: 1, size: 5, total: 0 },
};

export const FilterSlice = createSlice({
  name: "FilterSlice",
  initialState,
  reducers: {
    setLastFiltersUsed: (state, action) => {
      state.searchFilters.nameFilter = action.payload.nameFilter;
      state.searchFilters.docTypeFilter = action.payload.docTypeFilter;
    },
    setTablePaginationFilters: (state, action) => {
      state.tableFilters.page = action.payload.page;
      state.tableFilters.size = action.payload.size;
      state.tableFilters.total = action.payload.total;
    },
    setSize: (state, action) => {
      state.tableFilters.size = action.payload;
    },
    setPage: (state, action) => {
      state.tableFilters.page = action.payload;
    },
  },
});

export const getLastUsedFilters = (state: any) => state.filters.searchFilters;
export const getTablePaginationFilters = (state: any) =>
  state.filters.tableFilters;

export const {
  setLastFiltersUsed,
  setTablePaginationFilters,
  setSize,
  setPage,
} = FilterSlice.actions;
