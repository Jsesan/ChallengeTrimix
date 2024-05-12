"use client";

import Image from "next/image";
import EditSvg from "../../public/edit-1479-svgrepo-com.svg";
import DeleteSvg from "../../public/delete-filled-svgrepo-com.svg";
import Link from "next/link";
import {
  API_BASE_URL,
  MODAL_TEXT,
  PERSONA_ENDPOINT,
  ROUTES,
  TOAST,
} from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonas, setEditId } from "@/redux/Slices/PersonaSlice";
import Modal from "./Modal";
import { useState } from "react";
import { useAppDispatch } from "@/hooks";
import { getLastUsedFilters } from "@/redux/Slices/FilterSlice";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

const PersonaItem: React.FC<Persona> = (props: Persona) => {
  const { id, name, birthDate, docNumber, surname, docType } = props;
  const dispatch = useDispatch();
  const thunkDispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { nameFilter, docTypeFilter } = useSelector(getLastUsedFilters);

  const deletePersona = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}${PERSONA_ENDPOINT}/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success(TOAST.DELETE(id));
      }
    } catch (err: any) {
      toast.error(TOAST.OOPS);
      console.log({ err });
    } finally {
      setIsOpen(false);
      thunkDispatch(fetchPersonas({ nameFilter, docTypeFilter }));
    }
  };
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{surname}</td>
        <td>{docNumber}</td>
        <td>{docType}</td>
        <td>{birthDate}</td>
        <td className="flex flex-row justify-around">
          <Link
            href={ROUTES.PERSONA}
            className="edit-button p-2 rounded-md"
            onClick={() => dispatch(setEditId(id))}
          >
            <Image src={EditSvg} width={20} height={20} alt="edit" />
          </Link>
          <div
            className="delete-button p-2 rounded-md cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <Image src={DeleteSvg} width={20} height={20} alt="delete" />
          </div>
        </td>
      </tr>
      {isOpen &&
        createPortal(
          <Modal
            setIsOpen={setIsOpen}
            confirmCallback={() => deletePersona(id)}
          >
            <div className="text-2xl">{MODAL_TEXT.TITLE(id)}</div>
            <div className="text-l">{MODAL_TEXT.BODY}</div>
          </Modal>,
          document.body
        )}
    </>
  );
};

export default PersonaItem;
