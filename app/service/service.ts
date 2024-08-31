const ENV_PRODUCTION = "production";
const BASE_URL_DEFAULT = "http://localhost:4000";
const BASE_URL_PRODUCTION = "https://movies-api-psi-eosin.vercel.app";

interface Errors {
  message: string;
}

const getBaseURLByEnv = (): string => {
  if (process.env.NODE_ENV === ENV_PRODUCTION) {
    return BASE_URL_PRODUCTION || BASE_URL_DEFAULT;
  }

  return BASE_URL_DEFAULT!;
};

const getErrors = (errors: Errors[]) =>
  errors.map((error) => error.message).join(", ");

export const fetchData = async <T>(query: string, variables: T) => {
  const res = await fetch(`${getBaseURLByEnv()}/graphql`, {
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
