import { atomWithStorage } from "jotai/utils";

export interface LoginStateProps {
  login: string;
  password: string;
}

export const loginStateAtom = atomWithStorage<LoginStateProps>("login", {
  login: "",
  password: "",
});
