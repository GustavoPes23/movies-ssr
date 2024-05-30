"use client"
import { useState } from "react";

import { Provider as JotaiProvider, useAtom } from "jotai/react";
import { AuthStateProps, authStateAtom } from "./state/authState";
import FormLogin from "./containers/formLogin";

export default function Home() {
  const [auth] = useAtom<AuthStateProps>(authStateAtom);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <JotaiProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-primary">
        <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8">
          {!loggedIn ? (
            <FormLogin setLoggedIn={setLoggedIn}/>
          ) : (
            <h1>Welcome {auth.name}</h1>
          )}
        </div>
      </main>
    </JotaiProvider>
  );
}
