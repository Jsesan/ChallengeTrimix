import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

export const useAppDispatch =
  useDispatch.withTypes<ThunkDispatch<any, any, any>>();
