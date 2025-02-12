import { useState } from "react";
import { useAddMission, useMissions } from "../../../hooks/useMission";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../../routes/endPoints";

const MissionsPage = () => {
  const [newMission, setNewMission] = useState({
    title: "",
    description: "",
    responsible: "",
    destination: "",
    missionObject: "",
    priority: "medium",
    startDate: "",
    endDate: "",
    assignment: "",
    observations: "",
  });
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  const { data: missionsData } = useMissions();
  const { mutate: addMission } = useAddMission();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addMission(newMission, {
      onSuccess: () => {
        toast("Mission ajoutée avec succès", { type: "success" });
        setNewMission({
          title: "",
          description: "",
          responsible: "",
          destination: "",
          missionObject: "",
          priority: "medium",
          startDate: "",
          endDate: "",
          assignment: "",
          observations: "",
        });
      },
    });
  };

  return (
    <div
      className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "#0a192f" }}
    >
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">Missions</h1>
        <button
          onClick={() => setShowForm(!showForm)} // Affiche/masque le formulaire
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          {showForm ? "Annuler" : "Nouvelle mission"}
        </button>
      </div>

      {/* Formulaire d'ajout de mission */}
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded-lg shadow-lg mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-800">
            Ajouter une nouvelle mission
          </h2>

          <div className="mt-4">
            <label
              htmlFor="title"
              className="text-sm font-semibold text-gray-700"
            >
              Titre de la mission
            </label>
            <input
              type="text"
              id="title"
              value={newMission.title}
              onChange={(e) =>
                setNewMission({ ...newMission, title: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="description"
              className="text-sm font-semibold text-gray-700"
            >
              Description de la mission
            </label>
            <input
              type="text"
              id="description"
              value={newMission.description}
              onChange={(e) =>
                setNewMission({ ...newMission, description: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="responsible"
              className="text-sm font-semibold text-gray-700"
            >
              Responsable
            </label>
            <input
              type="text"
              id="responsible"
              value={newMission.responsible}
              onChange={(e) =>
                setNewMission({ ...newMission, responsible: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="destination"
              className="text-sm font-semibold text-gray-700"
            >
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={newMission.destination}
              onChange={(e) =>
                setNewMission({ ...newMission, destination: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="missionObject"
              className="text-sm font-semibold text-gray-700"
            >
              Objet de la mission
            </label>
            <input
              type="text"
              id="missionObject"
              value={newMission.missionObject}
              onChange={(e) =>
                setNewMission({ ...newMission, missionObject: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="priority"
              className="text-sm font-semibold text-gray-700"
            >
              Priorité
            </label>
            <select
              id="priority"
              value={newMission.priority}
              onChange={(e) =>
                setNewMission({ ...newMission, priority: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
          </div>

          <div className="mt-4">
            <label
              htmlFor="startDate"
              className="text-sm font-semibold text-gray-700"
            >
              Date de départ
            </label>
            <input
              type="date"
              id="startDate"
              value={newMission.startDate}
              onChange={(e) =>
                setNewMission({ ...newMission, startDate: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="endDate"
              className="text-sm font-semibold text-gray-700"
            >
              Date de retour
            </label>
            <input
              type="date"
              id="endDate"
              value={newMission.endDate}
              onChange={(e) =>
                setNewMission({ ...newMission, endDate: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="assignment"
              className="text-sm font-semibold text-gray-700"
            >
              Affectation
            </label>
            <input
              type="text"
              id="assignment"
              value={newMission.assignment}
              onChange={(e) =>
                setNewMission({ ...newMission, assignment: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="observations"
              className="text-sm font-semibold text-gray-700"
            >
              Observations
            </label>
            <textarea
              id="observations"
              value={newMission.observations}
              onChange={(e) =>
                setNewMission({ ...newMission, observations: e.target.value })
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              Créer la mission
            </button>
          </div>
        </form>
      )}

      {/* Tableau des missions */}
      {/* <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Titre</th>
              <th className="px-6 py-3 text-left">Responsable</th>
              <th className="px-6 py-3 text-left">Destination</th>
              <th className="px-6 py-3 text-left">Objet</th>
              <th className="px-6 py-3 text-left">Priorité</th>
              <th className="px-6 py-3 text-left">Date de départ</th>
              <th className="px-6 py-3 text-left">Date de retour</th>
              <th className="px-6 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {missionsData &&
              missionsData.map((mission) => (
                <tr
                  key={mission.id}
                  className="odd:bg-gray-50 hover:bg-gray-100 border-b font-semibold"
                >
                  <td className="px-6 py-3">{mission.title}</td>
                  <td className="px-6 py-3">{mission.responsible}</td>
                  <td className="px-6 py-3">{mission.destination}</td>
                  <td className="px-6 py-3">{mission.missionObject}</td>
                  <td className="px-6 py-3">{mission.priority}</td>
                  <td className="px-6 py-3">{mission.startDate}</td>
                  <td className="px-6 py-3">{mission.endDate}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-sm ${
                        {
                          "En attente": "text-red-600",
                          Approuvée: "text-green-600",
                          Terminé: "text-yellow-600",
                        }[mission.status] || "text-gray-600"
                      }`}
                    >
                      {mission.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gray-200 text-gray-800 uppercase text-sm font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Titre</th>
              <th className="px-6 py-3 text-left">Responsable</th>
              <th className="px-6 py-3 text-left">Destination</th>
              <th className="px-6 py-3 text-left">Objet</th>
              <th className="px-6 py-3 text-left">Priorité</th>
              <th className="px-6 py-3 text-left">Date de départ</th>
              <th className="px-6 py-3 text-left">Date de retour</th>
              <th className="px-6 py-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {missionsData?.map((mission) => (
              <tr
                key={mission.id}
                className="odd:bg-gray-50 hover:bg-gray-100 border-b font-semibold cursor-pointer"
                onClick={() => navigate(`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.MISSION}/${mission.id}`)}
              >
                <td className="px-6 py-3">{mission.title}</td>
                <td className="px-6 py-3">{mission.responsible}</td>
                <td className="px-6 py-3">{mission.destination}</td>
                <td className="px-6 py-3">{mission.missionObject}</td>
                <td className="px-6 py-3">{mission.priority}</td>
                <td className="px-6 py-3">{mission.startDate}</td>
                <td className="px-6 py-3">{mission.endDate}</td>
                <td className="px-6 py-3">
                  <span
                    className={`text-sm ${
                      {
                        "En attente": "text-red-600",
                        Approuvée: "text-green-600",
                        Terminé: "text-yellow-600",
                      }[mission.status] || "text-gray-600"
                    }`}
                  >
                    {mission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MissionsPage;
