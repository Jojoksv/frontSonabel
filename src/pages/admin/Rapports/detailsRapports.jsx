import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../../data/client/axiosInstance";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer le rapport depuis l'API
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await axiosInstance.get(`/report/${id}`);
        setReport(data);
      } catch (err) {
        console.error("Erreur lors de la récupération du rapport :", err);
        setError("Impossible de charger les détails du rapport.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-600">Chargement...</p>;
  }

  if (error || !report) {
    return <p className="text-center text-red-600">{error || "Rapport introuvable."}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">{report.title}</h1>
      <p className="text-gray-700 mt-2">{report.description}</p>
      <p className="mt-4 text-sm text-gray-500">🧑 Auteur : {report.author?.name || "Inconnu"}</p>
      <p className="text-sm text-gray-500">📅 Créé le : {report.createdAt}</p>
      <p className="text-sm text-gray-500">🔄 Mis à jour : {report.lastUpdated}</p>
      <p className="text-sm text-gray-500">📂 Catégorie : {report.category}</p>
      <p className="text-sm text-gray-500">✅ Statut : {report.status}</p>
      <p className="mt-6 text-gray-800">{report.content}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Retour
      </button>
    </div>
  );
};

export default ReportDetail;
