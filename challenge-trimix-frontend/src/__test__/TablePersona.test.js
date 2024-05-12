import PersonaTable from "@/components/PersonaTable";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { StoreProvider } from "@/redux/StoreProvider";
import store from "../redux/store";

const mockedPersonas = [
  {
    id: "1",
    name: "Juan",
    surname: "Sesan",
    birthDate: "2000/02/24",
    docNumber: "12345",
    docType: "Dni",
  },
  {
    id: "2",
    name: "Martin",
    surname: "Perez",
    birthDate: "1996/03/18",
    docNumber: "12345",
    docType: "Dni",
  },
];

// En este test buscamos sobre todo probar que las funcionalidad de la funcion RenderTable()
// en el componente PersonaTable sea correcto dado que es la funcion con mayor complejidad del proyecto
describe("TablePersona", () => {
  let personaTable;

  beforeEach(() => {
    personaTable = render(
      <StoreProvider>
        <PersonaTable />
      </StoreProvider>
    );
  });

  it("renders a table persona", () => {
    const container = personaTable.getByTestId("table-persona");
    expect(container).toBeInTheDocument();
  });

  it("renders api down state", () => {
    const apiFailureElements = personaTable.getByTestId("api-failure");
    expect(apiFailureElements).toBeInTheDocument();
  });

  it("renders loading state", async () => {
    await store.dispatch({ type: "personas/fetchPersonas/pending" });
    const loadingElements = personaTable.getByTestId("loading-state");
    expect(loadingElements).toBeInTheDocument();
  });

  it("renders empty state", async () => {
    await store.dispatch({
      type: "personas/fetchPersonas/fulfilled",
      payload: [],
    });
    const emptyElements = personaTable.getByTestId("empty-state");
    expect(emptyElements).toBeInTheDocument();
  });

  it("render table with 2 Personas", async () => {
    await store.dispatch({
      type: "personas/fetchPersonas/fulfilled",
      payload: mockedPersonas,
    });
    const tableBody = personaTable.getByTestId("table-body");
    const filas = tableBody.getElementsByTagName("tr");
    expect(tableBody).toBeInTheDocument();
    expect(filas.length).toBe(2);
  });
});
