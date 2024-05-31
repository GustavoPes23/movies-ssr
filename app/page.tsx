"use client";

import { useAtom } from "jotai/react";
import { RESET } from "jotai/utils";
import { AuthStateProps, authStateAtom } from "./state/authState";
import FormLogin from "./containers/formLogin";

export default function Home() {
  const [auth, setAuth] = useAtom<AuthStateProps>(authStateAtom);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-8 bg-primary shadow-2xl">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8">
        {!auth.token ? (
          <div className="grid col-rows-2">
            <FormLogin />
          </div>
        ) : (
          <>
            <h1>Welcome {auth.name}</h1>
            <button onClick={() => setAuth(RESET as unknown as AuthStateProps)}>
              Logout
            </button>
          </>
        )}
      </div>
    </main>
  );
}
