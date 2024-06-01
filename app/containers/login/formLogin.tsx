import { type FC, memo, useState, useCallback, useLayoutEffect } from "react";

import { useAtom } from "jotai";
import { RESET } from "jotai/utils";

import { type SubmitHandler, useForm } from "react-hook-form";

import { fetchData } from "@/app/service/service";

import { type AuthStateProps, authStateAtom } from "@/app/state/authState";
import { type LoginStateProps, loginStateAtom } from "@/app/state/loginState";
import { type AlertStateProps, alertStateAtom } from "@/app/state/alertState";

import Spinner from "@/app/components/spinner";

import { InputsForm } from "@/app/login/types";
import PasswordField from "./passwordField";

const FormLogin: FC = () => {
  const [_, setAuthAtom] = useAtom<AuthStateProps>(authStateAtom);
  const [loginAtom, setLoginAtom] = useAtom<LoginStateProps>(loginStateAtom);
  const [alertAtom, setAlertAtom] = useAtom<AlertStateProps>(alertStateAtom);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login, setLogin] = useState<LoginStateProps>(loginAtom);
  const [rememberMe, setRememberMe] = useState<boolean>(
    login.password ? true : false
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InputsForm>();

  const fetchLogin = useCallback(async (dataLogin: InputsForm) => {
    return await fetchData<InputsForm>(
      `query Login($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        token
        id
        name
      }
    }`,
      dataLogin
    );
  }, []);

  const onSubmit: SubmitHandler<InputsForm> = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetchLogin(data);

      if (response?.data) {
        setAuthAtom({
          ...response.data.login,
        });
      }

      if (!!data.rememberMe) {
        setLoginAtom({
          login: data.login,
          password: data.password,
        });
      } else {
        setLoginAtom(RESET as unknown as LoginStateProps);
      }
    } catch (error) {
      setAlertAtom({
        show: true,
        message: (error as Error).message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStorageLogin = useCallback((): void => {
    if (!loginAtom.password || !loginAtom.login) {
      return;
    }

    setLogin(loginAtom);
    setRememberMe(true);
    setValue("login", loginAtom.login);
    setValue("password", loginAtom.password);
  }, [loginAtom, setValue]);

  useLayoutEffect(() => {
    handleStorageLogin();
  }, [handleStorageLogin]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h5 className="text-xl font-medium text-gray-900">Acessar plataforma</h5>
      <div>
        <label
          htmlFor="login"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Username
        </label>
        <input
          type="text"
          id="login"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="name@company.com"
          required
          disabled={isLoading}
          value={login.login}
          {...register("login", {
            onChange: (e) => setLogin({ ...login, login: e.target.value }),
            required: true,
            maxLength: 20,
          })}
        />
        {errors.login && <span>{errors.login.message}</span>}
      </div>
      <PasswordField
        isLoading={isLoading}
        login={login}
        setLogin={setLogin}
        register={register}
        errors={errors}
      />
      <div className="flex items-start">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              disabled={isLoading}
              checked={rememberMe}
              {...register("rememberMe", {
                onChange: (e) => setRememberMe(e.target.checked),
              })}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Lembrar me
          </label>
        </div>
        <a
          href="#"
          className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
        >
          Esqueci minha senha
        </a>
      </div>
      <button
        type="submit"
        className="w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center button-primary"
        disabled={isLoading}
      >
        {isLoading ? <Spinner width={5} height={5} /> : "Login"}
      </button>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Não possui uma conta?{" "}
        <a
          href="/create-account"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Criar conta
        </a>
      </div>
    </form>
  );
};

export default memo(FormLogin);
