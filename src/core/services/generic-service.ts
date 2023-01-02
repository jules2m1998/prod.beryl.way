import type { IHttpResponse, IHttpError } from "@/types/https";
import ApiService from "./ApiService";

/**
 * Permet d'acceder à tous les éléments d'un endpoint
 * @param path le chemin vers le endpoint
 * @returns {T[]|null} Toutes la liste des éléments ou null en cas d'échec
 */
const getAll = async <T>(path: string): Promise<T[] | null> => {
  try {
    const response = await ApiService.get(path);
    const data = response.data as IHttpResponse<T>;

    return data.data as T[];
  } catch (error) {
    return null;
  }
};

/**
 * Permet d'un élément via une requête http endpoint
 * @param path le chemin vers le endpoint
 * @param request le chemin vers le endpoint
 * @template T le chemin vers le endpoint
 * @returns {T | null} Toutes la liste des éléments ou null en cas d'échec
 */
const createOne = async <T, P>(path: string, request: P): Promise<T | null> => {
  try {
    const response = await ApiService.post(path, request);
    const data = response.data.data as T;

    return data;
  } catch (e: any) {
    return null;
  }
};

export const putOne = async <T, P>(
  path: string,
  request: P
): Promise<T | IHttpError> => {
  try {
    const response = await ApiService.put(path, request);
    const data = response.data.data as T;

    return data;
  } catch (e: any) {
    return e as IHttpError;
  }
};

export const putWithParams = async <T, P>(
  path: string,
  params: P
): Promise<T | IHttpError> => {
  try {
    const response = await ApiService.putWithParams(path, null, params);
    const data = response.data.data as T;

    return data;
  } catch (e: any) {
    return e as IHttpError;
  }
};

export const getOne = async <T>(path: string): Promise<T | IHttpError> => {
  try {
    const response = await ApiService.get(path);
    const data = response.data as IHttpResponse<T>;

    return data.data as T;
  } catch (error) {
    return error as IHttpError;
  }
};

export const deleteOne = async <T>(path: string): Promise<T | IHttpError> => {
  try {
    const response = await ApiService.delete(path);
    const data = response.data as IHttpResponse<T>;

    return data.data as T;
  } catch (error) {
    return error as IHttpError;
  }
};

/**
 * Permet d'un élément via une requête http endpoint
 * @param path {string} le chemin vers le endpoint
 * @param request le chemin vers le endpoint
 * @template T le type de retour en cas de succès
 * @returns {T | null} Toutes la liste des éléments ou null en cas d'échec
 */
const createWithFormData = async <T>(
  path: string,
  request: FormData
): Promise<T | null> => {
  try {
    const response = await ApiService.postForm(path, request);
    const data = response.data.data as T;

    return data;
  } catch (e: any) {
    return null;
  }
};

export { getAll, createOne, createWithFormData };
