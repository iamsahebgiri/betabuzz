import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getCurrentUser() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get("accessToken")

  if (typeof accessToken?.value === "undefined") {
    redirect("/login")
  }

  const { NEXT_PUBLIC_API_BASE_URL } = process.env
  const baseURL = NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1"
  const data = await fetch(`${baseURL}/users/me`, {
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
  })
  const user = await data.json()
  return user
}
