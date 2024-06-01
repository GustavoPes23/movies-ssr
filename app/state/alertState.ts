import { atom } from "jotai";

export interface AlertStateProps {
  message: string;
  show: boolean;
}

export const alertStateAtom = atom<AlertStateProps>({
  message: "",
  show: false,
});
