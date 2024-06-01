import { atom } from "jotai";

type AlertType = "success" | "error" | "info" | "warning";

export interface AlertStateProps {
  message: string;
  show: boolean;
  type: AlertType;
}

export const alertStateAtom = atom<AlertStateProps>({
  message: "",
  show: false,
  type: "info",
});
