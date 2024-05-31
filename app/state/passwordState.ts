import { atomWithStorage } from "jotai/utils";

export interface PasswordStateProps {
  password: string;
}

export const passwordStateAtom = atomWithStorage<PasswordStateProps>("password", {
  password: "",
});
