import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useAddMission } from "../../../hooks/useMission";
import { endPoints } from "../../../routes/endPoints";
import axiosInstance from "../../../data/client/axiosInstance";

export default function NewMission() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { mutate: addMission } = useAddMission();
  const [users, setUsers] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    responsible: "",
    destination: "",
    missionObject: "",
    priority: "MEDIUM",
    startDate: "",
    endDate: "",
    assignment: [],
    observations: "",
  });

  // Récupération des utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAssignment = () => {
    if (selectedAssignment && !formData.assignment.includes(selectedAssignment)) {
      setFormData((prev) => ({
        ...prev,
        assignment: [...prev.assignment, selectedAssignment],
      }));
      setSelectedAssignment(""); // Réinitialiser la sélection
    }
  };

  const handleRemoveAssignment = (userMatricule) => {
    setFormData((prev) => ({
      ...prev,
      assignment: prev.assignment.filter((mat) => mat !== userMatricule),
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const addNewMission = {
      ...formData,
      userId: users.find((user) => user.name === formData.responsible)?.id,
    };
    addMission(addNewMission, {
      onSuccess: () => {
        toast.success("Mission ajoutée avec succès");
        setFormData({
          title: "",
          description: "",
          responsible: "",
          destination: "",
          missionObject: "",
          priority: "MEDIUM",
          startDate: "",
          endDate: "",
          assignment: [],
          observations: "",
        });
        navigate(`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.MISSION}`);
      },
      onError: (err) => {
        setError(err.message || "Une erreur est survenue");
        setIsSubmitting(false);
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle mission</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {["title", "description", "destination", "missionObject"].map(
              (field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              )
            )}

            {/* Sélection du responsable */}
            <div>
              <label
                htmlFor="responsible"
                className="block text-sm font-medium text-gray-700"
              >
                Responsable
              </label>
              <select
                id="responsible"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un responsable</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sélection de l'affectation */}
            <div>
              <label
                htmlFor="assignment"
                className="block text-sm font-medium text-gray-700"
              >
                Affectations
              </label>
              <div className="flex items-center space-x-2">
                <select
                  id="assignment"
                  value={selectedAssignment}
                  onChange={(e) => setSelectedAssignment(e.target.value)}
                  className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une personne</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={handleAddAssignment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Ajouter
                </button>
              </div>
              {/* Liste des affectations */}
          <ul>
            {formData.assignment.map((user) => (
              <li key={user} className="flex justify-between">
                {user}
                <button onClick={() => handleRemoveAssignment(user)} className="text-red-600">
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priorité
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="LOW">Basse</option>
                <option value="MEDIUM">Moyenne</option>
                <option value="HIGH">Haute</option>
                <option value="URGENT">Urgente</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                Date de début
              </label>
              <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                Date de fin
              </label>
              <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500" required />
            </div>
          </div>

          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
            Créer la mission
          </button>
        </form>
      </div>
    </div>
  );
}
