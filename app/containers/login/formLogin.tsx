import { type FC, memo, useState, useCallback, useLayoutEffect } from "react";

import { useAtom } from "jotai";
import { RESET } from "jotai/utils";

import { useForm, SubmitHandler } from "react-hook-form";

import { fetchData } from "../../service/service";

import { type AuthStateProps, authStateAtom } from "../../state/authState";
import { type LoginStateProps, loginStateAtom } from "../../state/loginState";
import { type AlertStateProps, alertStateAtom } from "../../state/alertState";

import Spinner from "../../components/spinner";

interface Inputs {
  readonly login: string;
  readonly password: string;
  readonly rememberMe: boolean;
}

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
  } = useForm<Inputs>();

  const fetchLogin = useCallback(async (dataLogin: Inputs) => {
    return await fetchData<Inputs>(
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
      });
      console.error((error as Error).message);
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
        {errors.login && <span>This field is required</span>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
          disabled={isLoading}
          value={login.password}
          {...register("password", {
            onChange: (e) =>
              setLogin({
                ...login,
                password: e.target.value,
              }),
            required: true,
            minLength: 1,
          })}
        />
        {errors.password && <span>This field is required</span>}
      </div>
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
            Remember me
          </label>
        </div>
        <a
          href="#"
          className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
        >
          Lost Password?
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
        Not registered?{" "}
        <a
          href="#"
          className="text-blue-700 hover:underline dark:text-blue-500"
        >
          Create account
        </a>
      </div>
    </form>
  );
};

export default memo(FormLogin);