import { useState, useEffect } from "react";
import { endPoints } from "../../../routes/endPoints";
import { Link } from "react-router-dom";

const ReportsPage = () => {
    const [reports, setReports] = useState([
        {
          id: 1,
          title: "Rapport Q1 2024",
          description: "Analyse des performances du premier trimestre.",
          author: "Jean Dupont",
          createdAt: "2024-01-15",
          lastUpdated: "2024-03-10",
          category: "Finance",
          status: "Validé",
          url: "/reports/1",
        },
        {
          id: 2,
          title: "Évaluation annuelle",
          description: "Rapport détaillé sur les indicateurs clés de performance.",
          author: "Sophie Martin",
          createdAt: "2024-06-20",
          lastUpdated: "2024-06-30",
          category: "Stratégie",
          status: "En cours de révision",
          url: "/reports/2",
        },
        {
          id: 3,
          title: "Rapport des ventes",
          description: "Synthèse des ventes et recommandations stratégiques.",
          author: "Pierre Lefèvre",
          createdAt: "2024-05-05",
          lastUpdated: "2024-05-15",
          category: "Commerce",
          status: "Approuvé",
          url: "/reports/3",
        },
      ]);

  // useEffect(() => {
  //   fetch("/api/reports")
  //     .then((response) => response.json())
  //     .then((data) => setReports((prev) => [...prev, ...data]))
  //     .catch((error) => console.error("Error fetching reports:", error));
  // }, []);

  const handleFileUpload = (e) => {
    const formData = new FormData();
    formData.append("report", e.target.files[0]);

    fetch("/api/reports/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setReports((prev) => [...prev, data]);
      })
      .catch((error) => console.error("Error uploading report:", error));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        📊 Gestion des Rapports
      </h1>

      {/* Upload Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <label className="block text-lg font-medium text-gray-700">
          📤 Télécharger un nouveau rapport :
        </label>
        <input
          type="file"
          onChange={handleFileUpload}
          className="mt-3 p-3 border border-gray-300 rounded-lg w-full cursor-pointer focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                📄 Titre
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                📝 Description
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                🧑 Auteur
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                📅 Créé le
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                🔄 Dernière mise à jour
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                📂 Catégorie
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                ✅ Statut
              </th>
              <th className="px-6 py-4 text-left text-gray-800 font-semibold border-b">
                🔍 Voir
              </th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr
                key={report.id}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-6 py-4 border-b">{report.title}</td>
                <td className="px-6 py-4 border-b text-gray-600">
                  {report.description}
                </td>
                <td className="px-6 py-4 border-b">{report.author}</td>
                <td className="px-6 py-4 border-b">{report.createdAt}</td>
                <td className="px-6 py-4 border-b">{report.lastUpdated}</td>
                <td className="px-6 py-4 border-b">{report.category}</td>
                <td className="px-6 py-4 border-b">{report.status}</td>
                <td className="px-6 py-4 border-b">
                  <Link to={`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.REPPORT}/${report.id}`}>
                    <button
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Voir détails
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
