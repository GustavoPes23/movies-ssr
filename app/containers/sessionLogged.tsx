import { type FC, memo } from "react";

import { useAtom } from "jotai/react";
import { RESET } from "jotai/utils";
import { type AuthStateProps, authStateAtom } from "../state/authState";

const SessionLogged: FC = () => {
  const [authAtom, setAuthAtom] = useAtom<AuthStateProps>(authStateAtom);

  return (
    <>
      <h1>Welcome {authAtom.name}</h1>
      <button onClick={() => setAuthAtom(RESET as unknown as AuthStateProps)}>
        Logout
      </button>
    </>
  );
};

export default memo(SessionLogged);
