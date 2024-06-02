"use client";

import { type ReactNode, type FC, useLayoutEffect } from "react";

import { useAtom, useAtomValue } from "jotai/react";

import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/navigation";

import { type AuthStateProps, authStateAtom } from "@/app/state/authState";

import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { useHydrateAtoms } from "jotai/utils";

interface PageProps {
  children: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  const router = useRouter();
  const { token } = useAtomValue<AuthStateProps>(authStateAtom);

  useLayoutEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <AnimatePresence mode="wait">
      {token && (
        <>
          <Header />
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            {children}
          </motion.div>
          <Footer />
        </>
      )}
    </AnimatePresence>
  );
};

export default Page;
