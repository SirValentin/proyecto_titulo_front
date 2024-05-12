export const useMyFetch = async (method, request, opts) => {
  const config = useRuntimeConfig();
  const { token } = useAuth();

  return $fetch(request, {
    headers: {
      Authorization: token.value,
      Accept: "application/json",
      "Content-type": "application/json",
    },
    baseURL: config.public.baseURL,
    method,
    ...opts,
  });
};
