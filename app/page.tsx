"use client";

import { useAtom } from "jotai/react";

import { useRouter } from "next/navigation";

import { type AuthStateProps, authStateAtom } from "@/app/state/authState";

import Alert from "@/app/components/alert";
import Header from "@/app/components/header";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [authAtom] = useAtom<AuthStateProps>(authStateAtom);

  if (!authAtom.token) {
    setTimeout(() => {
      router.push("/login");
    }, 600);
  }

  return (
    <AnimatePresence mode="wait">
      {authAtom.token && (
        <main className="min-h-screen bg-primary">
          <Header />
          <Alert />
        </main>
      )}
    </AnimatePresence>
  );
}
