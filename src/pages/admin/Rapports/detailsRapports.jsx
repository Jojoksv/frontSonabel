import { useParams, useNavigate } from "react-router-dom";

const reportsData = [
  {
    id: 1,
    title: "Rapport Q1 2024",
    description: "Analyse des performances du premier trimestre.",
    author: "Jean Dupont",
    createdAt: "2024-01-15",
    lastUpdated: "2024-03-10",
    category: "Finance",
    status: "Validé",
    content: "Contenu détaillé du rapport...",
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
    content: "Contenu détaillé du rapport...",
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
];

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = reportsData.find((r) => r.id === parseInt(id));

  if (!report) {
    return <div className="text-center text-red-600">Rapport introuvable.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900">{report.title}</h1>
      <p className="text-gray-700 mt-2">{report.description}</p>
      <p className="mt-4 text-sm text-gray-500">🧑 Auteur : {report.author}</p>
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
