import { useState } from 'react';

const StaffPage = () => {
  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'Alice Dupont', role: 'Manager', email: 'alice@example.com', phone: '0123456789', position: 'RH', employeeId: 'EMP001' },
    { id: 2, name: 'Jean Martin', role: 'Développeur', email: 'jean@example.com', phone: '0987654321', position: 'IT', employeeId: 'EMP002' }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    position: '',
    employeeId: ''
  });

  const handleChange = (e) => {
    setNewStaff({ ...newStaff, [e.target.name]: e.target.value });
  };

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setNewStaff(staff);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingStaff) {
      setStaffMembers(
        staffMembers.map((staff) => (staff.id === editingStaff.id ? newStaff : staff))
      );
      setEditingStaff(null);
    } else {
      setStaffMembers([...staffMembers, { ...newStaff, id: staffMembers.length + 1 }]);
    }
    setShowForm(false);
    setNewStaff({ name: '', role: '', email: '', phone: '', position: '', employeeId: '' });
  };

  return (
    <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 bg-[#0a192f] min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Personnel</h1>

      <button 
        onClick={() => { setShowForm(!showForm); setEditingStaff(null); }}
        className="mb-6 px-5 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300">
        {showForm ? 'Fermer le formulaire' : 'Ajouter un employé'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 text-gray-900">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" name="name" placeholder="Nom complet" onChange={handleChange} value={newStaff.name} className="border p-3 rounded w-full" required />
            <input type="text" name="role" placeholder="Rôle" onChange={handleChange} value={newStaff.role} className="border p-3 rounded w-full" required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={newStaff.email} className="border p-3 rounded w-full" required />
            <input type="text" name="phone" placeholder="Téléphone" onChange={handleChange} value={newStaff.phone} className="border p-3 rounded w-full" required />
            <input type="text" name="position" placeholder="Poste" onChange={handleChange} value={newStaff.position} className="border p-3 rounded w-full" required />
            <input type="text" name="employeeId" placeholder="Matricule" onChange={handleChange} value={newStaff.employeeId} className="border p-3 rounded w-full" required />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
            {editingStaff ? 'Modifier' : 'Enregistrer'}
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
            {staffMembers.map((staff) => (
              <tr key={staff.id} className="border-t hover:bg-gray-100">
                <td className="py-3 px-4">{staff.name}</td>
                <td className="py-3 px-4">{staff.role}</td>
                <td className="py-3 px-4">{staff.email}</td>
                <td className="py-3 px-4">{staff.phone}</td>
                <td className="py-3 px-4">{staff.position}</td>
                <td className="py-3 px-4">{staff.employeeId}</td>
                <td className="py-3 px-4">
                  <button 
                    onClick={() => handleEdit(staff)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300">
                    Modifier
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StaffPage;