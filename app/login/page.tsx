"use client";

import { useCallback, useLayoutEffect, type FC } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useAtom } from "jotai/react";

import { useRouter, usePathname } from "next/navigation";

import { type AuthStateProps, authStateAtom } from "@/app/state/authState";

import FormLogin from "@/app/containers/login/formLogin";

const Login: FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [authAtom] = useAtom<AuthStateProps>(authStateAtom);

  const handleRedirect = useCallback(() => {
    console.log(pathname)
    router.push(!authAtom.token ? "login" : "home");
  }, [authAtom.token, pathname, router]);

  useLayoutEffect(() => {
    handleRedirect();
  }, [authAtom.token, handleRedirect]);

  return (
    <div className="flex h-screen items-center justify-center">
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
            <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 md:p-8 shadow-2xl">
              <div className="grid col-rows-2">
                <FormLogin />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
