"use client"

import { useContext } from "react"
import { UserContext } from "@/providers/user.provider"

const useUser = () => {
  const contextData = useContext(UserContext)
  return { ...contextData }
}

export default useUser
