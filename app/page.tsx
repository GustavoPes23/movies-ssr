"use client";

import { useAtom } from "jotai/react";

import { useRouter } from 'next/navigation'

import { type AuthStateProps, authStateAtom } from "./state/authState";

import Alert from "./components/alert";
import Header from "./components/header";

export default function Home() {
  const router = useRouter();
  const [authAtom] = useAtom<AuthStateProps>(authStateAtom);
  
  if (!authAtom.token) {
    router.push('/login');
  }

  return (
    <main className="min-h-screen bg-primary">
      <Header />
      <Alert />
    </main>
  );
}
