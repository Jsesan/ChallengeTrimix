"use client";

import { Provider } from "react-redux";
import store from "./store";
import { ReactNode } from "react";

type StoreProviderProps = {
  children: ReactNode;
};

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};
