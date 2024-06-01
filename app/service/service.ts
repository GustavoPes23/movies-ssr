const ENV_PRODUCTION = "production";
const BASE_URL_DEFAULT = "http://localhost:4000";

interface Errors {
  message: string;
}

const getBaseURLByEnv = (): string => {
  if (process.env.NODE_ENV === ENV_PRODUCTION) {
    return process.env.BASE_URL_PROD || BASE_URL_DEFAULT;
  }

  return process.env.BASE_URL_PROD!;
};

const getErrors = (errors: Errors[]) =>
  errors.map((error) => error.message).join(", ");

export const fetchData = async <T>(query: string, variables: T) => {
  const res = await fetch("http://localhost:4000", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = res.json();

  if ((await json).errors) {
    throw new Error(getErrors((await json).errors));
  }

  return json;
};
