import { API_BASE_URL, PERSONA_ENDPOINT } from "@/constants";
import { Filters } from "@/models/Filter";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { setTablePaginationFilters } from "./FilterSlice";

export type PersonaState = {
  personas: Persona[];
  status: "idle" | "loading" | "success" | "failure";
  editId: string;
  error: string;
};

export const fetchPersonas = createAsyncThunk(
  "personas/fetchPersonas",
  async (filters: Filters, thunkApi) => {
    const queryParams = new URLSearchParams({
      name: filters.nameFilter,
      documentType: filters.docTypeFilter,
      page: filters.page ?? "1",
      size: filters.size ?? "5",
    });
    const res = await fetch(
      `${API_BASE_URL}${PERSONA_ENDPOINT}?${queryParams}`
    );
    const data = await res.json();
    const personas: Persona[] = [];
    data.personas.forEach((p: any) =>
      personas.push({
        id: p.perId,
        name: p.perNombre,
        surname: p.perApellido,
        birthDate: p.perFechaNacimiento,
        docNumber: p.perNumeroDocumento,
        docType: p.perTipoDocumento,
      })
    );
    thunkApi.dispatch(
      setTablePaginationFilters({
        page: data.page,
        size: data.size,
        total: data.totalPersonas,
      })
    );
    return personas;
  }
);

const initialState: PersonaState = {
  personas: [],
  status: "idle", // 'idle' | 'loading' | 'success; | 'failure'
  editId: "",
  error: "",
};

export const PersonaSlice = createSlice({
  name: "PersonaSlice",
  initialState,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload;
    },
    clearEditId: (state) => {
      state.editId = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchPersonas.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPersonas.fulfilled, (state, action) => {
      state.status = "success";
      state.personas = action.payload;
    });
    builder.addCase(fetchPersonas.rejected, (state, action) => {
      state.status = "failure";
      state.error = action.error.message ?? "Oops :(";
    });
  },
});

export const selectAllPersonas = (state: any) => state.personas.personas;
export const selectEditId = (state: any) => state.personas.editId;
export const getPersonasStatus = (state: any) => state.personas.status;
export const getPersonasError = (state: any) => state.personas.error;

//encontrar la persona a editar en base a su id
export const selectPersonaById = () =>
  createSelector([selectAllPersonas, selectEditId], (personas, id) =>
    personas.find((p: Persona) => p.id === id)
  );

export const { setEditId, clearEditId } = PersonaSlice.actions;
