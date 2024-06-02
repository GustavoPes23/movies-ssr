import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface LoginStateProps {
  login: string;
  password: string;
}

export const loginStateAtom = atomWithStorage<LoginStateProps>(
  "login",
  {
    login: "",
    password: "",
  },
  createJSONStorage(),
  {
    getOnInit: true,
  }
);
