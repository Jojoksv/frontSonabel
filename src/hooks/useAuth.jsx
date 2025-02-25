import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endPoints } from "../data/client/endPoints";
import axiosInstance from "../data/client/axiosInstance";
import { useCallback, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(endPoints.Auth.LOGIN, data);
      localStorage.setItem("access_token", res.data.token);
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${res.data.token}`; // Met à jour les headers
      queryClient.setQueryData(["user"], res.data.user);
      return res.data;
    },
    onSuccess: async (res) => {
      console.log(res.message);
      await handleFetchUser();
    },
    onError: (error) => {
      console.error("Erreur de connexion:", error.response?.data || error.message);
    },
  });

  // Fonction de login avec gestion des callbacks
  const login = useCallback(
    (data, { onSuccess, onError } = {}) => {
      loginMutation.mutate(data, {
        onSuccess: (res) => {
          if (onSuccess) onSuccess(res); // Appelle le callback onSuccess si défini
        },
        onError: (error) => {
          if (onError) onError(error); // Appelle le callback onError si défini
        },
      });
    },
    []
  );

  // Fonction pour récupérer les données de l'utilisateur
  const handleFetchUser = useCallback(async () => {
    try {
      console.log("Fetching user data...");
      const res = await axiosInstance.get('/auth')
      if (res) {
        console.log("User fetched successfully:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res);
      } else {
        console.log("No user data returned.");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, []);

  return {
    login,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
