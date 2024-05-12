import { configureStore } from "@reduxjs/toolkit";
import { PersonaSlice } from "./Slices/PersonaSlice";
import { FilterSlice } from "./Slices/FilterSlice";

export default configureStore({
  reducer: {
    personas: PersonaSlice.reducer,
    filters: FilterSlice.reducer,
  },
});

export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore["dispatch"];
