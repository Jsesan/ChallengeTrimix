"use client";

import {
  API_BASE_URL,
  BUTTON_LABELS,
  INPUT_LABELS,
  PERSONA_ENDPOINT,
  TITLES,
  TOAST,
} from "@/constants";
import Divider from "./Divider";
import Input from "./Input";
import DocumentTypeSelect from "./DocumentTypeSelect";
import Image from "next/image";
import Link from "next/link";
import ArrowSvg from "../../public/arrow-back-svgrepo.svg";
import SaveSvg from "../../public/save-floppy-svgrepo-com.svg";
import { useEffect, useState } from "react";
import {
  dateFormatterFromApiToInput,
  dateFormatterFromInputToApi,
  validacionFechaNacimiento,
  validacionNombres,
  validacionNumeros,
} from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { clearEditId, selectPersonaById } from "@/redux/Slices/PersonaSlice";
import { PersonaPayload } from "@/models/PersonaPayload";
import { useRouter } from "next/navigation";
import DateInput from "./DateInput";
import toast from "react-hot-toast";

const PersonaDatosGeneralesForm: React.FC = () => {
  const editPersona = useSelector(selectPersonaById());
  const dispatch = useDispatch();
  const router = useRouter();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [docNumberError, setDocNumberError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [documentTypeError, setDocumentTypeError] = useState(false);
  const [method, setMethod] = useState("POST");

  useEffect(() => {
    if (editPersona) {
      setName(editPersona.name);
      setSurname(editPersona.surname);
      setDocNumber(editPersona.docNumber);
      setDocumentType(editPersona.docType);
      setBirthDate(dateFormatterFromApiToInput(editPersona.birthDate));
      setMethod("PUT");
    }
  }, [editPersona]);

  const savePersona = async () => {
    let payload: PersonaPayload = {
      perNombre: name,
      perApellido: surname,
      perNumeroDocumento: parseInt(docNumber),
      perFechaNacimiento: dateFormatterFromInputToApi(birthDate),
      perTipoDocumento: documentType,
    };

    if (editPersona) {
      payload = { ...payload, perId: editPersona.id };
    }

    const bodyPayload = JSON.stringify(payload);
    try {
      const res = await fetch(`${API_BASE_URL}${PERSONA_ENDPOINT}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyPayload,
      });
      if (res.status === 200) {
        toast.success(TOAST.SAVE, { duration: 5000 });
        router.push("/");
      }
    } catch (err) {
      toast.error(TOAST.OOPS);
      console.log({ err });
    } finally {
      if (editPersona) dispatch(clearEditId());
    }
  };

  const validateInputs = (): boolean => {
    let validation = true;
    cleanUpError();
    if (name.trim() === "" || name.length < 3) {
      //nombre no puede estar vacio ni tener menos de 3 caracteres
      setNameError(true);
      validation = false;
    }
    if (surname === "" || surname.length < 3) {
      //apellido no puede estar vacio ni tener menos de 3 caracteres
      setSurnameError(true);
      validation = false;
    }
    if (docNumber === "" || docNumber.length < 5) {
      //docNumber no puede estar vacio ni tener menos de 5 digitos
      setDocNumberError(true);
      validation = false;
    }
    if (!documentType || documentType === "") {
      //documentType no puede estar vacio
      setDocumentTypeError(true);
      validation = false;
    }
    if (validacionFechaNacimiento(birthDate)) {
      setBirthDateError(true);
      validation = false;
    }
    return validation;
  };

  const cleanUpError = () => {
    setNameError(false);
    setSurnameError(false);
    setDocNumberError(false);
    setDocumentTypeError(false);
    setBirthDateError(false);
  };

  return (
    <form className="persona-form">
      <div className="text-4xl">{TITLES.FORM}</div>
      <Divider />
      <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-5 mb-16">
        <Input
          label={INPUT_LABELS.NAME}
          value={name}
          onChange={(e) => {
            const { value } = e.target;
            if (validacionNombres(value)) setName(value);
          }}
          showError={nameError}
        />
        <Input
          label={INPUT_LABELS.SURNAME}
          value={surname}
          onChange={(e) => {
            const { value } = e.target;
            if (validacionNombres(value)) setSurname(value);
          }}
          showError={surnameError}
        />
        <Input
          label={INPUT_LABELS.DOCNUMBER}
          value={docNumber}
          onChange={(e) => {
            const { value } = e.target;
            if (validacionNumeros(value)) setDocNumber(value);
          }}
          showError={docNumberError}
        />
        <DocumentTypeSelect
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
          showError={documentTypeError}
        />
        <DateInput
          label={INPUT_LABELS.BIRTHDATE}
          value={birthDate}
          onChange={(e) => {
            setBirthDate(e.target.value);
          }}
          showError={birthDateError}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <Link href={"/"} onClick={() => dispatch(clearEditId())}>
          <button className="back-button">
            <Image src={ArrowSvg} width={20} height={20} alt="back" />
            {BUTTON_LABELS.BACK}
          </button>
        </Link>
        <button
          type="submit"
          className="save-button"
          onClick={(e) => {
            e.preventDefault();
            if (validateInputs()) {
              savePersona();
            } else {
              toast.error("Tiene errores de validacion", { duration: 5000 });
            }
          }}
        >
          <Image src={SaveSvg} width={20} height={20} alt="save" />
          {BUTTON_LABELS.SAVE}
        </button>
      </div>
    </form>
  );
};

export default PersonaDatosGeneralesForm;
