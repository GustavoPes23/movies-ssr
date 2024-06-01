import { type FC, memo } from "react";

import type { UseFormRegister, FieldErrors } from "react-hook-form";

import type { InputsForm } from "@/app/create-account/types";

interface PersonalDataProps {
  register: UseFormRegister<InputsForm>;
  errors: FieldErrors<InputsForm>;
}

const PersonalData: FC<PersonalDataProps> = ({ register, errors }) => {
  return (
    <div className="w-full border-b border-gray-900/10 pb-12">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Informações pessoais
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
        <div className="sm:col-span-6">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nome
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="first-name"
              placeholder="John Doe"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
        </div>
        <div className="sm:col-span-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="email@example.com"
              className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PersonalData);
