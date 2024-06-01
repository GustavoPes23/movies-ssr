"use client";

import { useCallback, useState, type FC } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from "next/navigation";

import FormCreateAccount from "@/app/containers/create-account/formCreateAccount";
import Stepper from "@/app/containers/create-account/stepper";

import type { WizardSteps } from "@/app/create-account/types.d";

const CreateAccount: FC = () => {
  const router = useRouter();

  const [wizardSteps, setWizardSteps] = useState<WizardSteps>({
    next: 2,
    previous: 0,
  });

  const handleRedirect = useCallback(() => {
    setTimeout(() => {
      router.push("/login");
    }, 200);
  }, [router]);

  const handleBackStep = (): void => {
    if (wizardSteps.previous === 0) {
      handleRedirect();
      return;
    }

    setWizardSteps({
      previous: wizardSteps.previous - 1,
      next: wizardSteps.next - 1,
    });
  };

  const isLastStep = (): boolean => wizardSteps.next === 3;

  const handleNextStep = (): void => {
    if (isLastStep()) {
      return;
    }

    setWizardSteps({
      previous: wizardSteps.previous + 1,
      next: wizardSteps.next + 1,
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-between bg-primary md:p-24 p-8 ">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full flex justify-center align-center grid"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Stepper />
          <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow sm:p-6 mt-24 md:p-8 shadow-2xl">
            <div className="grid col-rows-2">
              <FormCreateAccount
                wizardSteps={wizardSteps}
                handleBackStep={handleBackStep}
                handleNextStep={handleNextStep}
                isLastStep={isLastStep}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default CreateAccount;
