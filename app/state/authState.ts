import { atom } from "jotai";

export interface AuthStateProps {
  id: string;
  name: string;
  token: string;
}

export const authStateAtom = atom<AuthStateProps>({
  id: "",
  name: "",
  token: "",
});
