import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { endPoints as navigationRoutes } from "../routes/endPoints";
import { endPoints } from "../data/client/endPoints";
import { toast } from "react-toastify";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      await axios.post(endPoints.Auth.LOGIN, data).then((res) => {
        console.log(res.data.message);
        localStorage.setItem("token", res.data.token);
        queryClient.setQueryData(["user"], res.data.user);
      });
    },
    onSuccess: () => {
      toast("Connexion réussie", { type: "success" });
      navigate(navigationRoutes.Admin.DASHBOARD);
    },
    onError: (error) => {
      console.error(
        "Erreur de connexion :",
        error.response?.data || error.message
      );
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
