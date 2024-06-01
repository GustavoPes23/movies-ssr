import { motion } from "framer-motion";
import { type FC, memo } from "react";

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
        delay: 0.2
        
      }}

    >
      <ol className="flex items-center">
        <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block">
          <span className={getClassName(currentStep === 1)}>
            <svg
              className="w-4 h-4 text-white lg:w-5 lg:h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 16"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
          </span>
        </li>

        <li className="flex items-center">
          <span className={getClassName(currentStep === 2)}>
            <svg
              className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
          </span>
        </li>
      </ol>
    </motion.div>
  );
};

export default memo(Stepper);
