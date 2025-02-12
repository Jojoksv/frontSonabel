import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import { useAddMission } from '../../../hooks/useMission';
import { endPoints } from '../../../routes/endPoints';

export default function NewMission() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { mutate: addMission } = useAddMission();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    responsible: '',
    destination: '',
    missionObject: '',
    priority: 'MEDIUM',
    startDate: '',
    endDate: '',
    assignment: '',
    observations: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    addMission(formData, {
      onSuccess: () => {
        toast.success('Mission ajoutée avec succès');
        setFormData({
          title: '',
          description: '',
          responsible: '',
          destination: '',
          missionObject: '',
          priority: 'MEDIUM',
          startDate: '',
          endDate: '',
          assignment: '',
          observations: ''
        });
        navigate(`${endPoints.Admin.DASHBOARD}/${endPoints.Admin.MISSION}`);
      },
      onError: (err) => {
        setError(err.message || 'Une erreur est survenue');
        setIsSubmitting(false);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Nouvelle mission</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleFormSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['title', 'description', 'responsible', 'destination', 'missionObject', 'assignment'].map(field => (
              <div key={field}>
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  required
                />
              </div>
            ))}

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priorité</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                required
              >
                <option value="LOW">Basse</option>
                <option value="MEDIUM">Moyenne</option>
                <option value="HIGH">Haute</option>
                <option value="URGENT">Urgente</option>
              </select>
            </div>

            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="observations" className="block text-sm font-medium text-gray-700">Observations</label>
            <textarea
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button onClick={() => navigate(-1)} type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Création...' : 'Créer la mission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
