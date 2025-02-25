import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const ENV = import.meta.env.VITE_ENV;

const currentUrl = ENV === "PROD" ? url : "http://localhost:3000";

// Vérifier si le token est bien stocké
console.log("Token stocké dans localStorage:", localStorage.getItem("access_token"));

export const axiosInstance = axios.create({
    baseURL: currentUrl,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`, // ✅ Mettre Authorization ici !
    },
});

// ✅ Intercepteur pour s'assurer que le token est toujours ajouté
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token"); // Vérifie si un token est présent
        if (token) {
            console.log("🔹 Ajout du token à la requête:", token);
            config.headers["Authorization"] = `Bearer ${token}`;
        } else {
            console.log("⚠️ Aucun token trouvé dans localStorage.");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
