"use client";

import { type FC, memo, useState, useCallback } from "react";

import { useRouter } from "next/navigation";

import { useAtom } from "jotai";

import { type SubmitHandler, useForm } from "react-hook-form";

import Spinner from "@/app/components/spinner";

import { fetchData } from "@/app/service/service";

import PersonalData from "@/app/containers/create-account/personalData";
import LoginData from "@/app/containers/create-account/loginData";

import type { WizardSteps, InputsForm } from "@/app/create-account/types.d";
import { type AlertStateProps, alertStateAtom } from "@/app/state/alertState";

import type { RequestCreateAccount } from "@/app/login/types";

interface FormCreateAccountProps {
  readonly wizardSteps: WizardSteps;
  readonly handleBackStep: (e: unknown) => void;
  readonly handleNextStep: () => void;
  readonly isLastStep: () => boolean;
}

const FormCreateAccount: FC<FormCreateAccountProps> = ({
  wizardSteps,
  handleBackStep,
  handleNextStep,
  isLastStep,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setAlertAtom] = useAtom<AlertStateProps>(alertStateAtom);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<InputsForm>();

  const validatePassword = (data: InputsForm): boolean => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "validate",
        message: "Senhas não conferem",
      });
      return false;
    }

    return true;
  };

  const fetchLogin = useCallback(async (dataLogin: InputsForm) => {
    return await fetchData<{ input: RequestCreateAccount }>(
      `mutation Mutation($input: UserInputCreate) {
        create(input: $input) {
          id
        }
      }
      `,
      {
        input: {
          name: dataLogin.name,
          email: dataLogin.email,
          login: dataLogin.login,
          password: dataLogin.password,
        },
      }
    );
  }, []);

  const handleRedirect = useCallback(() => {
    setTimeout(() => {
      router.push("/login");
    }, 600);
  }, [router]);

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      setIsLoading(true);

      if (!validatePassword(data)) {
        return;
      }

      const response = await fetchLogin(data);

      if (response?.data?.create?.id) {
        setAlertAtom({
          show: true,
          message: "Conta criada com sucesso!",
          type: "success",
        });
        handleRedirect();
      }
    } catch (error) {
      setAlertAtom({
        show: true,
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {wizardSteps.previous === 0 && (
        <PersonalData register={register} errors={errors} />
      )}

      {wizardSteps.previous === 1 && (
        <LoginData register={register} errors={errors} />
      )}

      <div className="mt-6 flex items-center justify-between gap-x-6">
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
          className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm button-primary"
        >
          {isLastStep() ? (
            isLoading ? (
              <Spinner width={5} height={5} />
            ) : (
              "Criar conta"
            )
          ) : (
            "Proximo"
          )}
        </button>
      </div>
    </form>
  );
};

export default memo(FormCreateAccount);
