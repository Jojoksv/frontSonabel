import { useState, useEffect } from "react";
import { endPoints } from "../../../routes/endPoints";
import { Link } from "react-router-dom";
import axiosInstance from "../../../data/client/axiosInstance";
import { toast, ToastContainer } from "react-toastify";

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les rapports depuis l'API
    const fetchReports = async () => {
        try {
            const { data } = await axiosInstance.get("/report");
            setReports(data);
        } catch (err) {
            console.error("Erreur lors de la récupération des rapports :", err);
            setError("Impossible de charger les rapports.");
        } finally {
            setLoading(false);
        }
    };

    // Appel API au montage du composant
    useEffect(() => {
        fetchReports();
    }, []);

    // Gestion de la mise à jour du statut
    const handleStatusChange = async (id, newStatus) => {
        try {
            await axiosInstance.patch(`/report/update/${id}`, { status: newStatus });
            setReports(reports.map(report => report.id === id ? { ...report, status: newStatus } : report));
            toast("Statut mis à jour avec success !", { duration: 5000, type: "success"})
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut", error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                📊 Gestion des Rapports de Mission
            </h1>

            <div className="flex justify-end mb-4">
                <Link to={`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.REPPORT}/create`}>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        ➕ Nouveau Rapport
                    </button>
                </Link>
            </div>

            {loading ? (
                <p className="text-center text-gray-600">Chargement des rapports...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full border-collapse border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">📄 Titre</th>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">📝 Description</th>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">🧑 Auteur</th>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">📅 Créé le</th>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">🔄 Dernière mise à jour</th>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">✅ Statut</th>
                                <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">🔍 Voir</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={report.id} className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                    <td className="px-6 py-4 border-b">{report.title}</td>
                                    <td className="px-6 py-4 border-b text-gray-600">{report.description}</td>
                                    <td className="px-6 py-4 border-b">{report.author?.name || "Inconnu"}</td>
                                    <td className="px-6 py-4 border-b">{report.createdAt}</td>
                                    <td className="px-6 py-4 border-b">{report.lastUpdated}</td>
                                    <td className="px-6 py-4 border-b">
                                        <select
                                            value={report.status}
                                            onChange={(e) => handleStatusChange(report.id, e.target.value)}
                                            className="border rounded p-1"
                                        >
                                            <option value="Validé">Validé</option>
                                            <option value="En cours de révision">En cours de révision</option>
                                            <option value="Rejeté">Rejeté</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <Link to={`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.REPPORT}/${report.id}`}>
                                            <button className="text-blue-600 hover:underline font-medium">Voir détails</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ReportsPage;
