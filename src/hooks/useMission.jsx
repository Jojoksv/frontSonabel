import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../data/client/axiosInstance';

// Fonction pour récupérer toutes les missions
const fetchMissions = async () => {
  const { data } = await axiosInstance.get('missions');
  return data;
};

// Hook pour récupérer les missions
export const useMissions = () => {
  return useQuery({
    queryKey: ['missions'],
    queryFn: fetchMissions,
  });
};

// Fonction pour ajouter une mission
const addMission = async (newMission) => {
  const { data } = await axiosInstance.post('missions', newMission);
  return data;
};

// Hook pour ajouter une mission
export const useAddMission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMission,
    onSuccess: (data) => {
      // Mettre à jour le cache après ajout
      queryClient.setQueryData(['missions'], (oldMissions = []) => [...oldMissions, data]);
    },
    onError: (error) => {
      console.error('Error adding mission:', error);
    },
  });
};
