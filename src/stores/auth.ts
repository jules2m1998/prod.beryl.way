import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import type { IUser, IUserLogin, IUserResponse } from "@/types";


export interface User {
  name: string;
  surname: string;
  email: string;
  password: string;
  api_token: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref<string | null>(null);
  const user = ref<IUser>({} as IUser);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: IUserResponse) {
    isAuthenticated.value = true;
    user.value = authUser.data;
    errors.value = null;
    JwtService.saveToken(authUser.token);
  }

  function setAuthProfile(authUser: IUser) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = null;
  }

  function setError(error?: string) {
    errors.value = error ?? null;
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as IUser;
    errors.value = null;
    JwtService.destroyToken();
  }

  function login(credentials: IUserLogin) {
    return ApiService.post("sign-in", credentials)
      .then(({ data }) => {
        console.info(data);
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.message);
        console.error(response);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError();
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("profile")
        .then(({ data }) => {
          console.log(data);
          setAuthProfile(data.data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
  };
});
