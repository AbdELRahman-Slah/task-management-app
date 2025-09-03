import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "./use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const useApiRequest = () => {
  const navigate = useNavigate();

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
          navigate("/login");
          toast({
            title: "Session expired",
            description: "Please log in again",
            variant: "destructive",
          });
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
