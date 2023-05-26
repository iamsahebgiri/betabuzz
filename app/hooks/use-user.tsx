import useSWR from "swr";

import userService from "@/services/user.service";

export default function useUser() {
  const { data, mutate, error } = useSWR("user.me", () => userService.me(), {
    shouldRetryOnError: false,
  });

  const loading = !data && !error;
  const loggedOut = error && error.code === 401;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
