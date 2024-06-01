"use client";

import { useCallback, useEffect, type FC } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useAtom } from "jotai/react";

import { useRouter } from "next/navigation";

import { type AuthStateProps, authStateAtom } from "../state/authState";

import FormLogin from "../containers/login/formLogin";

const Login: FC = () => {
  const router = useRouter();
  const [authAtom] = useAtom<AuthStateProps>(authStateAtom);

  const handleRedirect = useCallback(() => {
    if (!authAtom.token) {
      return;
    }

    setTimeout(() => {
      router.push("/");
    }, 600);
  }, [authAtom.token, router]);

  useEffect(() => {
    handleRedirect();
  }, [authAtom.token, handleRedirect]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-primary md:p-24 p-8 ">
      <AnimatePresence mode="wait">
        {!authAtom.token && (
          <motion.div
            className="w-full flex justify-center align-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 mt-24 md:p-8 shadow-2xl">
              <div className="grid col-rows-2">
                <FormLogin />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Login;
