import { type FC, memo } from "react";

import type { UseFormRegister, FieldErrors } from "react-hook-form";

import type { InputsForm } from "@/app/create-account/types";

interface LoginDataProps {
  register: UseFormRegister<InputsForm>;
  errors: FieldErrors<InputsForm>;
}

const LoginData: FC<LoginDataProps> = ({ register, errors }) => {
  return (
    <div className="border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Informações de acesso
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor="login"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Login
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="login"
              placeholder="john.doe"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("login", { required: true })}
            />
            {errors.login && <span>{errors.login.message}</span>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Senha
          </label>
          <div className="mt-1">
            <input
              id="password"
              type="password"
              autoComplete="password"
              placeholder="••••••••"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("password", { required: true })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Confirmar senha
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="confirmPassword"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("confirmPassword", { required: true })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(LoginData);
