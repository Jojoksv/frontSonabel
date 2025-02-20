import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../data/client/axiosInstance";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDeleteMission } from "../../../hooks/useMission";

const fetchMissionById = async (id) => {
  const { data } = await axiosInstance.get(`/missions/${id}`);
  return data;
};

// Définition du schéma de validation avec Zod
const missionSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  responsible: z.string().min(1, "Le responsable est requis"),
  destination: z.string().min(1, "La destination est requise"),
  missionObject: z.string().min(1, "L'objet de la mission est requis"),
  priority: z.enum(["low", "medium", "high"]),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  assignment: z.string().min(1, "L'assignation est requise"),
  observations: z.string().optional(),
});

const MissionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [newMission, setNewMission] = useState({
    title: "",
    description: "",
    responsible: "",
    destination: "",
    missionObject: "",
    priority: "medium",
    startDate: "",
    endDate: "",
    assignment: [],
    observations: "",
  });

  const {
    data: mission,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["mission", id],
    queryFn: () => fetchMissionById(id),
    staleTime: 1000 * 60 * 5,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(missionSchema),
  });

  const { mutate: deleteMission } = useDeleteMission();

  const updateMissionStatusMutation = useMutation({
    mutationFn: (newStatus) =>
      axiosInstance.patch(`/missions/${id}`, { status: newStatus }),
    onSuccess: () => {
      toast("Statut de la mission mis à jour avec succès !", {
        type: "success",
      });
      queryClient.invalidateQueries(["mission", id]);
    },
  });

  const updateMissionMutation = useMutation({
    mutationFn: (updatedMission) =>
      axiosInstance.put(`/missions/${id}`, updatedMission),
    onSuccess: () => {
      queryClient.invalidateQueries(["mission", id]);
      toast("Mission mise à jour avec succès !", { type: "success" });
      setIsEditing(false);
    },
  });

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };

    fetchUsers();


    if (mission) {
      reset(mission);
    }
  }, [mission, reset]);

  if (isLoading)
    return <p className="text-center text-gray-500 text-lg">Chargement...</p>;
  if (isError || !mission)
    return (
      <p className="text-center text-red-500 text-lg">Mission introuvable !</p>
    );

    const handleAddAssignment = (userMatricule) => {
      if (!newMission.assignment.includes(userMatricule)) {
        setNewMission((prevMission) => ({
          ...prevMission,
          assignment: [...prevMission.assignment, userMatricule],
        }));
      }
    };

    const handleRemoveAssignment = (userMatricule) => {
      setNewMission((prevMission) => ({
        ...prevMission,
        assignment: prevMission.assignment.filter(
          (matricule) => matricule !== userMatricule
        ),
      }));
    };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg border-2 border-gray-300">
      <ToastContainer />
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">
        {mission.title}
      </h1>

      {isEditing ? (
        <form
          onSubmit={handleSubmit((data) => updateMissionMutation.mutate(data))}
          className="p-4 bg-gray-100 rounded-lg"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Modifier la mission
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-sm font-semibold text-gray-700"
              >
                Titre
              </label>
              <input
                type="text"
                placeholder="Titre"
                {...register("title")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-semibold text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                placeholder="Description"
                {...register("description")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="responsible"
                className="text-sm font-semibold text-gray-700"
              >
                Responsable
              </label>
              <input
                type="text"
                placeholder="Responsable"
                {...register("responsible")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.responsible ? "border-red-500" : ""
                }`}
              />
              {errors.responsible && (
                <span className="text-red-500 text-sm">
                  {errors.responsible?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="destination"
                className="text-sm font-semibold text-gray-700"
              >
                Destination
              </label>
              <input
                type="text"
                placeholder="Destination"
                {...register("destination")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.destination ? "border-red-500" : ""
                }`}
              />
              {errors.destination && (
                <span className="text-red-500 text-sm">
                  {errors.destination?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="missionObject"
                className="text-sm font-semibold text-gray-700"
              >
                Objet de la mission
              </label>
              <input
                type="text"
                placeholder="Objet de la mission"
                {...register("missionObject")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.missionObject ? "border-red-500" : ""
                }`}
              />
              {errors.missionObject && (
                <span className="text-red-500 text-sm">
                  {errors.missionObject?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="priority"
                className="text-sm font-semibold text-gray-700"
              >
                Priorité
              </label>
              <select
                {...register("priority")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.priority ? "border-red-500" : ""
                }`}
              >
                <option value="low">Basse</option>
                <option value="medium">Moyenne</option>
                <option value="high">Haute</option>
              </select>
              {errors.priority && (
                <span className="text-red-500 text-sm">
                  {errors.priority?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className="text-sm font-semibold text-gray-700"
              >
                Date de début
              </label>
              <input
                type="date"
                {...register("startDate")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.startDate ? "border-red-500" : ""
                }`}
              />
              {errors.startDate && (
                <span className="text-red-500 text-sm">
                  {errors.startDate?.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="endDate"
                className="text-sm font-semibold text-gray-700"
              >
                Date de fin
              </label>
              <input
                type="date"
                {...register("endDate")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.endDate ? "border-red-500" : ""
                }`}
              />
              {errors.endDate && (
                <span className="text-red-500 text-sm">
                  {errors.endDate?.message}
                </span>
              )}
            </div>

            {/* <div className="flex flex-col">
              <label
                htmlFor="assignment"
                className="text-sm font-semibold text-gray-700"
              >
                Assignation
              </label>
              <input
                type="text"
                placeholder="Assignation"
                {...register("assignment")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.assignment ? "border-red-500" : ""
                }`}
              />
              {errors.assignment && (
                <span className="text-red-500 text-sm">
                  {errors.assignment?.message}
                </span>
              )}
            </div> */}
            <div className="mt-4">
            <label
              htmlFor="assignment"
              className="text-sm font-semibold text-gray-700"
            >
              Affectation
            </label>
            <div className="mt-2">
              <select
                id="assignment"
                onChange={(e) => handleAddAssignment(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Sélectionner une affectation</option>
                {users?.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Affichage des personnes affectées */}
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">
                Personnes affectées :
              </h3>
              <ul className="mt-2">
                {newMission.assignment.map((userMatricule) => (
                  <li
                    key={userMatricule}
                    className="flex justify-between items-center"
                  >
                    <span>
                      {
                        users?.find((user) => user.name === userMatricule)
                          ?.name
                      }
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAssignment(userMatricule)}
                      className="ml-2 text-red-600"
                    >
                      Supprimer
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

            <div className="flex flex-col">
              <label
                htmlFor="observations"
                className="text-sm font-semibold text-gray-700"
              >
                Observations
              </label>
              <input
                type="text"
                placeholder="Observations"
                {...register("observations")}
                className={`p-2 border border-gray-300 rounded-md ${
                  errors.observations ? "border-red-500" : ""
                }`}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
            >
              Annuler
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <p>
              <span className="font-semibold text-blue-700">Titre :</span>{" "}
              {mission.title}
            </p>
            <p>
              <span className="font-semibold text-blue-700">Description :</span>{" "}
              {mission.description}
            </p>
            <p>
              <span className="font-semibold text-blue-700">Responsable :</span>{" "}
              {mission.responsible}
            </p>
            <p>
              <span className="font-semibold text-blue-700">Destination :</span>{" "}
              {mission.destination}
            </p>
            <p>
              <span className="font-semibold text-blue-700">
                Objet de la mission :
              </span>{" "}
              {mission.missionObject}
            </p>
            <p>
              <span className="font-semibold text-blue-700">Priorité :</span>{" "}
              {mission.priority}
            </p>
            <p>
              <span className="font-semibold text-blue-700">
                Date de début :
              </span>{" "}
              {mission.startDate}
            </p>
            <p>
              <span className="font-semibold text-blue-700">Date de fin :</span>{" "}
              {mission.endDate}
            </p>
            <p>
              <span className="font-semibold text-blue-700">Assignation :</span>{" "}
              {mission.assignment &&
                mission.assignment.map((assignation, index) => (
                  <div key={index}>
                    <span>{assignation}</span>
                    <br />
                  </div>
                ))}
            </p>
            <p>
              <span className="font-semibold text-blue-700">
                Observations :
              </span>{" "}
              {mission.observations}
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-semibold text-gray-700">
              Mettre à jour le statut :
            </label>
            <select
              value={mission.status}
              onChange={(e) =>
                updateMissionStatusMutation.mutate(e.target.value)
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md bg-gray-100"
            >
              <option value="En attente">En attente</option>
              <option value="Approuvée">Approuvée</option>
              <option value="Terminée">Terminée</option>
            </select>
          </div>

          <div className="mt-6 flex justify-between">
            <div className="flex itesm-center space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
              >
                Modifier
              </button>
              <button
                onClick={() => {
                  deleteMission(mission.id);
                  toast("Mission supprimée avec succès", { type: "error" });
                  navigate(-1);
                }}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600"
            >
              Fermer
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MissionDetails;
