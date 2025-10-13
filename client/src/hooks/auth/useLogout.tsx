import AuthContext from "@/contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function useLogout() {
  const navigate = useNavigate();

  const { clearUser } = useContext(AuthContext);

  return useMutation({
    mutationFn: () => {
      return axios.post(`${API_URL}/users/logout`);
    },
    onSuccess: () => {
      clearUser();

      navigate("/");
    },
  });
}

export default useLogout;
