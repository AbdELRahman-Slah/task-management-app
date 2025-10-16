import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import axiosRetry from "axios-retry";

const API_URL = import.meta.env.VITE_API_URL;

axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => retryCount * 1000,
  retryCondition: (error) => error.response?.status >= 500,
});

const useApiRequest = () => {
  const navigate = useNavigate();

  const { clearUser } = useContext(AuthContext);

  async function apiRequest<T>(
    url: string,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      const response = await axios<T>(url, {
        ...options,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return response;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response.status === 401) {
        try {
          const refreshResponse = await axios.post(
            `${API_URL}/users/refresh`,
            null,
            { withCredentials: true }
          );
          if (refreshResponse.status === 200) {
            return apiRequest<T>(url, options);
          }
        } catch (e) {
          clearUser();

          // toast({
          //   title: "Session expired",
          //   description: "Please log in again",
          //   variant: "destructive",
          // });

          throw axiosError;
        }
      }

      if (axiosError.response.statusText !== "OK") {
        throw new Error("API request failed");
      }

      console.error("API error:", axiosError);
      throw axiosError;
    }
  }

  return apiRequest;
};

export default useApiRequest;
