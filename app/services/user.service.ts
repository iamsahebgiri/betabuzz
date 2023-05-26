import APIService from "@/services/api.service"

const { NEXT_PUBLIC_API_BASE_URL } = process.env

class UserService extends APIService {
  constructor() {
    super(NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1")
  }

  async me() {
    return this.get("/users/me")
      .then((response) => {
        const { data } = response
        console.log(data);
        return data
      })
      .catch((error) => {
        throw error?.response?.data
      })
  }
}

const userService = new UserService()

export default userService
