import {
  Briefcase,
  ClipboardList,
  Plus,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { endPoints } from "../../../routes/endPoints";
import { useMissions } from "../../../hooks/useMission";
import axiosInstance from "../../../data/client/axiosInstance";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [recentMissions, setRecentMissions] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [personnelStats, setPersonnelStats] = useState({
    total: 0,
    available: 0,
    onMission: 0,
  });
  // const [reportStats, setReportStats] = useState(0);
  
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await axiosInstance.get("/missions");

        const sortedMissions = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setRecentMissions(sortedMissions);

        const pending = response.data
          .filter((mission) => mission.status === "En attente")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      setPendingApprovals(pending);

      const userResponse = await axiosInstance.get("/user");
      const users = userResponse.data;

      const personnelData = {
        total: users.length,
        available: users.filter((user) => user.status === "Disponible").length,
        onMission: users.filter((user) => user.status === "En mission").length,
      };
      setPersonnelStats(personnelData);

      // Récupération des rapports
      // const reportResponse = await axiosInstance.get("/rapport");
      // const reports = reportResponse.data;
      // setReportStats(reports);


      } catch (error) {
        console.error("Erreur lors de la récupération des missions", error);
      }
    };
    
    fetchMissions();
  }, []);

  const getMissionStats = (missions = []) => {
    const stats = {
      total: missions.length,
      pending: 0,
      completed: 0,
      inProgress: 0,
    };
  
    missions.forEach((mission) => {
      if (mission.status === "En attente") stats.pending += 1;
      if (mission.status === "Terminé") stats.completed += 1;
      if (mission.status === "Approuvée") stats.inProgress += 1;
    });
  
    return stats;
  };
  
  const { data: missionsData } = useMissions();
  const statis = getMissionStats(missionsData || []);  

  return (
    <div className="space-y-6 p-6 bg-gray-50">
      {/* En-tête avec actions rapides */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">
            Bienvenue sur votre espace de gestion des missions
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to={endPoints.Admin.NEWMISSION}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="h-5 w-5 mr-2" />
            Nouvelle mission
          </Link>
          <Link
            to={endPoints.Admin.REPPORT}
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
          >
            <FileCheck className="h-5 w-5 mr-2" />
            Nouveau rapport
          </Link>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Missions */}
        <Link
          to={endPoints.Admin.MISSION}
          className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Missions
                </h3>
                <p className="text-gray-600 text-sm">Vue d&apos;ensemble</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {statis.total}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between items-center bg-yellow-50 p-2 rounded-lg">
                <span className="text-yellow-700">En attente</span>
                <span className="font-semibold text-yellow-700">
                  {statis.pending}
                </span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                <span className="text-green-700">Terminées</span>
                <span className="font-semibold text-green-700">
                  {statis.completed}
                </span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                <span className="text-blue-700">En cours</span>
                <span className="font-semibold text-blue-700">
                  {statis.inProgress}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Personnel */}
        <Link
          to={`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.PERSONNEL}`}
          className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personnel
                </h3>
                <p className="text-gray-600 text-sm">Disponibilité</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Effectif total</span>
              <span className="text-2xl font-bold text-gray-900">
                {personnelStats.total}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-blue-50 p-2 rounded-lg">
                <span className="text-blue-700">En mission</span>
                <span className="font-semibold text-blue-700">
                  {personnelStats.onMission}
                </span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                <span className="text-green-700">Disponible</span>
                <span className="font-semibold text-green-700">
                  {personnelStats.available}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Rapports */}
        <Link
          to={`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.REPPORT}`}
          className="bg-white rounded-xl shadow-sm p-3 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <ClipboardList className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Rapports
                </h3>
                <p className="text-gray-600 text-sm">État des rapports</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total soumis</span>
              <span className="text-2xl font-bold text-gray-900">
                {/* {reportStats.length} */}
                3
              </span>
            </div>
            {/* <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between items-center bg-yellow-50 p-2 rounded-lg">
                <span className="text-yellow-700">En attente</span>
                <span className="font-semibold text-yellow-700">
                  {stats.reports.pending}
                </span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-2 rounded-lg">
                <span className="text-green-700">Approuvés</span>
                <span className="font-semibold text-green-700">
                  {stats.reports.approved}
                </span>
              </div>
            </div> */}
          </div>
        </Link>
      </div>

      {/* Section principale avec 3 colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions récentes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Missions récentes
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Dernières missions créées
                </p>
              </div>
              <Link
                to={endPoints.Admin.MISSION}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentMissions.map((mission) => (
              <div key={mission.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-900">
                        {mission.responsible}
                      </h4>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            mission.priority === "urgent"
                              ? "bg-red-100 text-red-800"
                              : mission.priority === "high"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                      >
                        {mission.priority === "urgent"
                          ? "Urgent"
                          : mission.priority === "high"
                          ? "Prioritaire"
                          : "Normal"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {mission.destination} - {mission.type}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Départ le{" "}
                      {new Date(mission.departureDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm
                        ${
                          mission.status === "En attente"
                            ? "bg-yellow-100 text-yellow-800"
                            : mission.status === "Approuvée"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {mission.status === "En attente" ? (
                        <Clock className="h-4 w-4 mr-1" />
                      ) : mission.status === "Approuvée" ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      )}
                      {mission.status === "En attente"
                        ? "En attente"
                        : mission.status === "Approuvée"
                        ? "Approuvée"
                        : "Terminée"}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    to={`${endPoints.Admin.MISSION}/${mission.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validations en attente */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Validations en attente
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Éléments nécessitant votre attention
                </p>
              </div>
              <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                {pendingApprovals.length}
              </span>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{item.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.type === "expense" ? "Dépense" : "Rapport"} soumis
                      par {item.submittedBy}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`${endPoints.Admin.MISSION}/${item.id}`}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Voir les détails →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Missions à venir */}
        {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Missions à venir
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Prochaines missions programmées
                </p>
              </div>
              <Link
                to="/missions"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {upcomingMissions.map((mission) => (
              <div key={mission.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {mission.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {mission.location} - {mission.participants} participants
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Début le{" "}
                      {new Date(mission.startDate).toLocaleDateString()} (
                      {mission.duration})
                    </p>
                  </div>
                  <Link
                    to={`/missions/${mission.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Voir les détails →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
