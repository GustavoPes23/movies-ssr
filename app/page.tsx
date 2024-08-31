"use client";

import { type ReactNode, type FC, useLayoutEffect } from "react";

import { useAtomValue } from "jotai/react";

import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { type AuthStateProps, authStateAtom } from "@/app/state/authState";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";

import Jwt from "../app/service/jwt";

interface PageProps {
  readonly children: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  const router = useRouter();
  const { token } = useAtomValue<AuthStateProps>(authStateAtom);

  useLayoutEffect(() => {
    if (Jwt.isExpired(token)) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <AnimatePresence mode="wait">
      <Header />
      <motion.div
        className="w-full container mx-auto p-4 min-h-screen"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        {children}
      </motion.div>
      <Footer />
    </AnimatePresence>
  );
};

export default Page;
