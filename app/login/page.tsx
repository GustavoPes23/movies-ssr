"use client";

import { type FC } from "react";

import { AnimatePresence, motion } from "framer-motion";

import FormLogin from "@/app/containers/login/formLogin";

const Login: FC = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <AnimatePresence mode="wait">
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
      </AnimatePresence>
    </div>
  );
};

export default Login;
