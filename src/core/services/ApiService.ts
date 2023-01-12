import type { App } from "vue";
import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import type { IHttpError } from "@/types/https";
import { alertWithOkCancel, customAlert } from "@/core/helpers";
import router from "@/router/clean";
import { useAuthStore } from "@/stores/auth";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  static {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error: AxiosError) {
        const { status, data } = error.response!;
        if (navigator.onLine) {
          const text = (data as IHttpError).message;
          let title: string;

          switch (status) {
            case 422:
              title =
                '<h1 style="color:black !important;">Informations incorrectes !</h1>';
              break;
            case 404:
              title =
                '<h1 style="color:black !important;">Element inexistant !</h1>';
              break;
            default:
              title =
                '<h1 style="color:black !important;">Something went wrong !</h1>';
          }
          if (status === 404) {
            await router.push({ name: "404" });
          }

          await customAlert(title, text, "error");
          const authStore = useAuthStore();
          authStore.logout();
          if (status === 401) await router.push({ name: "sign-in" });
        } else {
          await customAlert(
            '<h1 style="color:black !important;">Oops..</h1>',
            "Vous n'etes plus connecté à internet !",
            "error"
          );
        }

        return Promise.reject(data);
      }
    );
    axios.interceptors.request.use(
      async function (config) {
        // Do something before request is sent
        if (config.method === "delete") {
          const alertResult = await alertWithOkCancel(
            "Voulez-vous vraiment supprimer cette élément ?",
            "Cette suppression sera définitive",
            "Supprimer"
          );
          if (!alertResult.isConfirmed)
            throw new axios.Cancel("Operation canceled by the user.");
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    ApiService.vueInstance.axios.defaults.baseURL =
      import.meta.env.VITE_APP_API_URL;
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static postForm(
    resource: string,
    params: FormData
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static putWithParams(
    resource: string,
    params: any,
    data: any
  ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, data, { params });
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
