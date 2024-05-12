export const TITLES = {
  MAIN: "Personas",
  FILTERS: "Filtros",
  FORM: "Datos Generales",
};

export const BUTTON_LABELS = {
  NEW: "+ Nuevo",
  SEARCH: "Buscar",
  BACK: "Volver",
  SAVE: "Guardar",
  BORRAR: "Borrar",
  CANCELAR: "Cancelar",
};

export const MODAL_TEXT = {
  TITLE: (id: string) => `¿Seguro quiere borrar usuario con ID: ${id}?`,
  BODY: "Esta accion es irreversible. Porfavor confirme antes de proceder",
};

export const INPUT_LABELS = {
  NAME: "Nombre",
  SURNAME: "Apellido",
  DOCNUMBER: "Numero Documento",
  DOCTYPE: "Tipo de Documento",
  BIRTHDATE: "Fecha de Nacimiento",
};

export const INPUT_ERROR_MSG = {
  NAME: "Nombre no puede estar vacio. Debe contener almenos 3 caracteres",
  SURNAME: "Apellido no puede estar vacio. Debe contener almenos 3 caracteres",
  DOCNUMBER:
    "Numero Documento no puede estar vacio. Debe contener almenos 5 caracteres",
  DOCTYPE: "Debe seleccionar un Tipo de Documento valido",
  BIRTHDATE: "Seleccione una fecha valida. Debe ser mayor de 13 años",
};

export const TABLE_COLUMNS = {
  ID: "Id",
  ...INPUT_LABELS,
};

export const TABLE_STATES = {
  emptyState: {
    title: "No hay registros con los filtros seleccionados",
    body: `Pruebe otra combinacion de filtros o cree un nuevo registro "+ Nuevo"`,
  },
  loading: "Loading...",
};

export const DOCUMENT_TYPE_OPTIONS = {
  DNI: "Dni",
  CEDULA: "Cedula",
  PASAPORTE: "Pasaporte",
  TODAS: "Todas",
  PLACEHOLDER: "Seleccione...",
};

export const ROUTES = {
  PERSONA: "/persona",
};

export const TOAST = {
  SAVE: "Persona guardada con exito",
  OOPS: `Oops... ocurrio un error \nIntende de nuevo mas tarde`,
  DELETE: (id: string) => `Usuario con id:${id} eliminado con exito`,
};

export const API_BASE_URL = "http://localhost:8080";
export const PERSONA_ENDPOINT = "/persona";
