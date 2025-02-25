import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../routes/endPoints";

const loginSchema = z.object({
  matricule: z
    .string()
    .min(5, "Le matricule doit contenir au moins 5 caractères.")
    .max(50, "Le matricule ne peut pas dépasser 50 caractères."),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .max(128, "Le mot de passe ne doit pas dépasser 128 caractères.")
    .regex(
      /[a-z]/,
      "Le mot de passe doit contenir au moins une lettre minuscule."
    )
    .regex(
      /[A-Z]/,
      "Le mot de passe doit contenir au moins une lettre majuscule."
    )
    .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre.")
    .regex(
      /[@$!%*?&]/,
      "Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, &)."
    ),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => {
        toast("Connexion réussie", { type: "success", duration: 5000, icon: "🎉" });
        navigate(endPoints.Admin.DASHBOARD);
      },
      onError: () => {
        toast("Veuillez vérifier vos identifiants", { type: "error" });
      },
    });
  };

  return (
    <div className="form-container">
      <ToastContainer
        position="top-right"
        duration={3000}
      />
      <div className="form-content">
        <div className="form-header">
          <h2>Bienvenue</h2>
          <small>Connectez-vous pour continuer</small>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper">
            <label>Matricule</label>
            <input
              type="text"
              placeholder="Matricule"
              {...register("matricule")}
            />
            <small className="text-red-500">{errors.matricule?.message}</small>
          </div>
          <div className="input-wrapper">
            <label>Mot de passe</label>
            <input
              type="password"
              placeholder="Mot de passe"
              {...register("password")}
            />
            <small className="text-red-500">{errors.password?.message}</small>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
