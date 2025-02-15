import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../../data/client/axiosInstance";
import { z } from "zod";
import { useState } from "react";

const staffSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  role: z.string().min(2, "Rôle requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(8, "Numéro invalide"),
  position: z.string().min(2, "Poste requis"),
  matricule: z.string().min(1, "Matricule requis"),
  password: z.string().min(6, "Mot de passe requis"),
});

const fetchStaffMembers = async () => {
  const { data } = await axiosInstance.get("/user");
  return data;
};

const StaffPage = () => {
  const queryClient = useQueryClient();
  const { data: staffMembers = [], isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaffMembers,
  });

  const addMutation = useMutation({
    mutationFn: (newStaff) => {
      axiosInstance.post("/user", newStaff);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"] }),
  });

  const editMutation = useMutation({
    mutationFn: ({ id, updatedStaff }) =>
      axiosInstance.put(`/user/${id}`, updatedStaff),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/user/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff"] }),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    if (editingStaff) {
      editMutation.mutate({ id: editingStaff.id, updatedStaff: data });
    } else {
      addMutation.mutate(data);
    }
    reset();
    setEditingStaff(null);
    setShowForm(false);
  };

  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setShowForm(true);
    Object.keys(staff).forEach((key) => setValue(key, staff[key]));
  };

  return (
    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-[#0a192f] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Personnel</h1>
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingStaff(null);
          reset();
        }}
        className="mb-6 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
      >
        {showForm ? "Fermer le formulaire" : "Ajouter un employé"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md mb-6 text-gray-900"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                {...register("name")}
                placeholder="Nom complet"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            <div>
              <input
                {...register("matricule")}
                placeholder="Matricule"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.matricule?.message}</p>
            </div>
            <div>
              <input
                {...register("password")}
                placeholder="Mot de passe"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.password?.message}</p>
            </div>
            <div>
              <input
                {...register("role")}
                placeholder="Rôle"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.role?.message}</p>
            </div>
            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.email?.message}</p>
            </div>
            <div>
              <input
                {...register("phone")}
                type="tel"
                placeholder="Téléphone"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.phone?.message}</p>
            </div>
            <div>
              <input
                {...register("position")}
                placeholder="Poste"
                className="border p-3 rounded w-full"
              />
              <p className="text-red-500">{errors.position?.message}</p>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {editingStaff ? "Modifier" : "Enregistrer"}
          </button>
        </form>
      )}

      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse bg-white text-gray-900 shadow-lg rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4">Nom</th>
              <th className="py-3 px-4">Rôle</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Téléphone</th>
              <th className="py-3 px-4">Poste</th>
              <th className="py-3 px-4">Matricule</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  Chargement des données...
                </td>
              </tr>
            ) : (
              staffMembers.map((staff) => (
                <tr key={staff.id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">{staff.name}</td>
                  <td className="py-3 px-4">{staff.role}</td>
                  <td className="py-3 px-4">{staff.email}</td>
                  <td className="py-3 px-4">{staff.phone}</td>
                  <td className="py-3 px-4">{staff.position}</td>
                  <td className="py-3 px-4">{staff.matricule}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button onClick={() => handleEdit(staff)}>Modifier</button>
                    <button onClick={() => deleteMutation.mutate(staff.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;
