import useSWR from "swr";

import userService from "@/services/user.service";
import { User } from "@/types";
import { useEffect } from "react";

export default function useUser() {
  const { data, mutate, error, isLoading } = useSWR<User>(
    "user.me",
    () => userService.me(),
    {
      shouldRetryOnError: false,
      refreshInterval: 0,
    }
  );

  const loggedOut = error && error.code === 401;

  return {
    loading: isLoading,
    loggedOut,
    user: data,
    mutate,
  };
}
