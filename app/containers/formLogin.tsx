import { type FC, memo, useState, useCallback } from "react";

import { useAtom } from "jotai";

import { useForm, SubmitHandler } from "react-hook-form";
import { fetchData } from "../service/service";
import { authStateAtom } from "../state/authState";

interface Inputs {
  readonly login: string;
  readonly password: string;
}

interface DataLogin {
  readonly login: string;
  readonly password: string;
}

interface FormLoginProps {
  readonly setLoggedIn: (loggedIn: boolean) => void;
}

const FormLogin: FC<FormLoginProps> = ({ setLoggedIn }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_, setAuth] = useAtom(authStateAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchLogin = useCallback(async (dataLogin: DataLogin) => {
    return await fetchData<DataLogin>(
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

      console.log(response?.data);

      if (response?.data) {
        setAuth({
          ...response.data.login,
        });
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <h5 className="text-xl font-medium text-gray-900 dark:text-white">
        Acessar plataforma
      </h5>
      <div>
        <label
          htmlFor="login"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Login
        </label>
        <input
          type="text"
          id="login"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
          {...register("login", { required: true, maxLength: 20 })}
        />
        {errors.login && <span>This field is required</span>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
          {...register("password", { required: true, minLength: 1 })}
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
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
        {isLoading ? "Loading..." : "Login"}
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
