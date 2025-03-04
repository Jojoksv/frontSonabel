import { useState, useEffect } from "react";
import axiosInstance from "../../../data/client/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../../routes/endPoints";

const CreateReportForm = () => {
  const [missions, setMissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    authorId: "",
    missionId: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/missions")
      .then((response) => setMissions(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des missions :", error));

    axiosInstance
      .get("/user")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des utilisateurs :", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/report", formData)
      .then((response) => {
        console.log("Rapport créé avec succès :", response.data);
      })
      .then(() => {
        toast("Rapport ajouté !", { type: 'success', duration: 4000});
        navigate(`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.REPPORT}`)
      })
      .catch((error) => console.error("Erreur lors de la création du rapport :", error));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-900 mb-6">📝 Créer un Rapport</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Titre du Rapport</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 p-3 border rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 p-3 border rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Auteur</label>
          <select
            name="authorId"
            value={formData.authorId}
            onChange={handleChange}
            className="mt-2 p-3 border rounded-lg w-full"
            required
          >
            <option value="">Sélectionnez un auteur</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Mission Associée</label>
          <select
            name="missionId"
            value={formData.missionId}
            onChange={handleChange}
            className="mt-2 p-3 border rounded-lg w-full"
            required
          >
            <option value="">Sélectionnez une mission</option>
            {missions.map((mission) => (
              <option key={mission.id} value={mission.id}>
                {mission.title}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          📄 Ajouter le Rapport
        </button>
      </form>
    </div>
  );
};

export default CreateReportForm;
