"use client";

import { useEffect, useState } from "react";

import { useAtom } from "jotai/react";

import { AuthStateProps, authStateAtom } from "./state/authState";

import Spinner from "./components/spinner";

import FormLogin from "./containers/formLogin";
import SessionLogged from "./containers/sessionLogged";

export default function Home() {
  const [authAtom] = useAtom<AuthStateProps>(authStateAtom);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, [authAtom]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-8 bg-primary shadow-2xl">
      <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8">
        {isLoading ? (
          <Spinner width={8} height={8} />
        ) : !authAtom.token ? (
          <div className="grid col-rows-2">
            <FormLogin />
          </div>
        ) : (
          <SessionLogged />
        )}
      </div>
    </main>
  );
}
