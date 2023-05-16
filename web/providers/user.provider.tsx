"use client"

import { ReactElement, createContext } from "react"
import userService from "@/services/user.service"
import useSWR from "swr"

export const UserContext = createContext<any>({})

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const { data, error, isLoading } = useSWR("user", () => userService.me())

  return (
    <UserContext.Provider value={{ user: data, error, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}
