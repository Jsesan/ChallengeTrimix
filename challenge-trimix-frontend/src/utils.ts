export const dateFormatterFromInputToApi = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // ajustamos el mes sumando 1 al indice
  const day = String(date.getDate() + 1).padStart(2, "0"); // ajustamos el dia sumando 1 al indice
  return `${year}/${month}/${day}`;
};

export const dateFormatterFromApiToInput = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // ajustamos el mes sumando 1 al indice
  const day = String(date.getDate()).padStart(2, "0"); // ajustamos el dia sumando 1 al indice
  return `${year}-${month}-${day}`;
};

export const validacionNombres = (
  value: string
): boolean | RegExpMatchArray => {
  //regex nombres: se permites los nombres con valores de a-z y un maximo de 30 caracteres
  // se permiten los espacios pero se verifica que no se envien solo espacion luego
  return value.match(/^[a-z\s]{1,30}$/i) || value === "";
};

export const validacionNumeros = (
  value: string
): boolean | RegExpMatchArray => {
  //regex numeros: se permites los numeros con valores de 0-9 y un maximo de 20 numeros
  return value.match(/^[0-9]{1,20}$/) || value === "";
};

export const validacionFechaNacimiento = (birthDate: string): boolean => {
  const today = new Date();
  const inputDate = new Date(birthDate);
  const age = today.getFullYear() - inputDate.getFullYear();
  if (isNaN(inputDate.getTime()) || inputDate > today || age < 13) {
    //La persona debe ser almenos de 13 años para ser registrada
    return true;
  } else {
    return false;
  }
};

export const obtenerFechaMaxima = () => {
  const today = new Date();
  const year = today.getFullYear() - 13;
  const month = String(today.getMonth()).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
