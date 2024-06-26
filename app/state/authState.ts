import { atomWithStorage, createJSONStorage } from "jotai/utils";

export interface AuthStateProps {
  id: string;
  name: string;
  token: string;
}

export const authStateAtom = atomWithStorage<AuthStateProps>(
  "auth",
  {
    id: "",
    name: "",
    token: "",
  },
  createJSONStorage(),
  {
    getOnInit: true,
  }
);
