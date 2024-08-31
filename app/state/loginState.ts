import { atom } from "jotai";
export interface LoginStateProps {
  login: string;
  password: string;
}

export const loginStateAtom = atom<LoginStateProps>(
  {
    login: "",
    password: "",
  },
);
