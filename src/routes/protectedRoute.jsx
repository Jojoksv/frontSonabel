import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../data/client/axiosInstance";

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [userI, setUserI] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Première requête pour récupérer les données utilisateur
    axiosInstance
      .get('/auth')
      .then((response) => {
        setUserI(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsAuthenticated(true);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Token invalide ou expiré, déconnexion...");
          handleLogout(navigate, setIsAuthenticated, setUserI);
        } else {
          console.error("Erreur lors de la récupération des données :", error);
        }
      });

    // Vérification des informations utilisateur dans localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.matricule || !user.id || !user.name) {
      navigate("/");
    }
    // else if (user.role !== "admin") {
    //   navigate("/");
    // }
  }, [navigate]);

  const handleLogout = (navigate, setIsAuthenticated, setUserI) => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserI(null);
    navigate("/");
  };

  if (userI === null) {
    return (
      <div className="pt-[11rem] flex items-center justify-center py-[11rem]">
        Chargement des données...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-[11rem] flex items-center justify-center py-[11rem]">
        Vous devez vous connecter.
      </div>
    );
  }

  // Si l'utilisateur est valide, afficher le contenu protégé
  return userI && userI.matricule && userI.id && userI.name ? <>{children}</> : null;
};