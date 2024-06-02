"use client";

import { useLayoutEffect } from "react";

import { useAtom } from "jotai/react";

import { AnimatePresence } from "framer-motion";

import { useRouter } from "next/navigation";

import { type AuthStateProps, authStateAtom } from "@/app/state/authState";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

export default function Home() {
  const router = useRouter();
  const [authAtom] = useAtom<AuthStateProps>(authStateAtom);

  useLayoutEffect(() => {
    if (!authAtom.token) {
      router.push("/login");
    }
  }, [authAtom.token, router]);

  return (
    <AnimatePresence mode="wait">
      {authAtom.token && (
        <>
          <Header />
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
}
