import APIService from "@/services/api.service";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

class AuthService extends APIService {
  async register(data: any) {
    return this.post("/auth/register", data, { headers: {} })
      .then((response) => {
        const { data } = response;
        this.setAccessToken(
          data.tokens.access.token,
          data.tokens.access.expires
        );
        this.setRefreshToken(
          data.tokens.refresh.token,
          data.tokens.refresh.expires
        );
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signIn(data: any) {
    return this.post("/auth/login", data, { headers: {} })
      .then((response) => {
        const { data } = response;
        this.setAccessToken(
          data.tokens.access.token,
          data.tokens.access.expires
        );
        this.setRefreshToken(
          data.tokens.refresh.token,
          data.tokens.refresh.expires
        );
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signInWithGoogle(data: any) {
    return this.post("/auth/oauth/google", data, { headers: {} })
      .then((response) => {
        const { data } = response;
        this.setAccessToken(
          data.tokens.access.token,
          data.tokens.access.expires
        );
        this.setRefreshToken(
          data.tokens.refresh.token,
          data.tokens.refresh.expires
        );
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async signOut() {
    return this.post("/auth/logout", {
      refreshToken: this.getRefreshToken(),
    })
      .then((response) => {
        this.purgeAccessToken();
        this.purgeRefreshToken();
        return response?.data;
      })
      .catch((error) => {
        this.purgeAccessToken();
        this.purgeRefreshToken();
        throw error?.response?.data;
      });
  }
}

const authService = new AuthService();

export default authService;
