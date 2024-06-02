import { type FC, memo } from "react";

import { motion } from "framer-motion";

import { IdentificationIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

interface StepperProps {
  readonly currentStep: number;
}

function getClassName(isActive: boolean): string {
  if (isActive) {
    return "flex items-center justify-center w-10 h-10 bg-green-100 rounded-full lg:h-12 lg:w-12 dark:bg-green-800 shrink-0";
  }

  return "flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0";
}

const Stepper: FC<StepperProps> = ({ currentStep }) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <ol className="flex items-center">
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
          <motion.span 
            className={getClassName(currentStep === 1)}
            animate={{ 
              opacity: currentStep === 1 ? 1 : 0.5
            }}
            transition={{
              duration: 0.6,
              delay: 0.06,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <IdentificationIcon
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </motion.span>
        </li>

        <li className="flex items-center">
          <motion.span 
            className={getClassName(currentStep === 2)}
            animate={{ 
              opacity: currentStep === 2 ? 1 : 0.5
            }}
            transition={{
              duration: 0.6,
              delay: 0.06,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <CheckCircleIcon
              className="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </motion.span>
        </li>
      </ol>
    </motion.div>
  );
};

export default memo(Stepper);
