const ENV_PRODUCTION = "production";
const BASE_URL_DEFAULT = "http://localhost:4000";

const getBaseURLByEnv = (): string => {
  if (process.env.NODE_ENV === ENV_PRODUCTION) {
    return process.env.BASE_URL_PROD || BASE_URL_DEFAULT;
  } 

  return process.env.BASE_URL_DEV || BASE_URL_DEFAULT;
};

export const fetchData = async<T>(query: string, variables: T) => {
  const res = await fetch(getBaseURLByEnv()!, {
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

  return res.json();
};