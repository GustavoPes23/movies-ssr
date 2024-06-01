"use client";

import { type FC, memo, useState } from "react";

import { type SubmitHandler, useForm } from "react-hook-form";

import PersonalData from "@/app/containers/create-account/personalData";
import LoginData from "@/app/containers/create-account/loginData";

import type { WizardSteps, InputsForm } from "@/app/create-account/types.d";

interface FormCreateAccountProps {
  readonly wizardSteps: WizardSteps;
  readonly handleBackStep: () => void;
  readonly handleNextStep: () => void;
  readonly isLastStep: () => boolean;
}

const FormCreateAccount: FC<FormCreateAccountProps> = ({
  wizardSteps,
  handleBackStep,
  handleNextStep,
  isLastStep,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsForm>();

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      setIsLoading(true);
      // const response = await fetchLogin(data);

      // if (response?.data) {
      //   setAuthAtom({
      //     ...response.data.login,
      //   });
      // }

      // if (!!data.rememberMe) {
      //   setLoginAtom({
      //     login: data.login,
      //     password: data.password,
      //   });
      // } else {
      //   setLoginAtom(RESET as unknown as LoginStateProps);
      // }
    } catch (error) {
      // setAlertAtom({
      //   show: true,
      //   message: (error as Error).message,
      // });
      console.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {wizardSteps.previous === 0 && <PersonalData />}

      {wizardSteps.previous === 1 && <LoginData />}

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleBackStep}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Voltar
        </button>
        <button
          type={isLastStep() ? "submit" : "button"}
          onClick={handleNextStep}
          disabled={isLoading}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isLastStep()
            ? isLoading
              ? "Carregando..."
              : "Criar conta"
            : "Proximo"}
        </button>
      </div>
    </form>
  );
};

export default memo(FormCreateAccount);
