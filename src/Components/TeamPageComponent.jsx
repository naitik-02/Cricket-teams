import React, { useState, useEffect } from 'react';
import { useTeamContext } from '../Context/TeamContext';
import { useNavigate } from 'react-router-dom';
import CreateTeamForm from './TeamCreationForm';
import { Search, Users, Plus, ChevronRight, Trash2, Shield } from 'lucide-react';

const TeamsPage = () => {
  const { myTeams, loading, deleteTeam, fetchMyTeams } = useTeamContext(); // Add fetchTeams here
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchMyTeams(); 
  }, [fetchMyTeams]);

  const filteredTeams = myTeams.filter(team =>
    team.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteTeam = async (id) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      await deleteTeam(id);
      await fetchMyTeams(); // Refetch teams after deletion
    }
  };

  const handleTeamCreated = async () => {
    await fetchMyTeams(); 
    setIsModalOpen(false); 
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-red-500 to-red-600',
      'from-indigo-500 to-indigo-600'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3 text-white">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Teams Management</h1>
                <p className="text-blue-100">
                  {filteredTeams.length} Teams registered
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teams..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-100" />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 font-medium shadow-md"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Team
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 space-y-4 bg-white rounded-2xl shadow-lg">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-gray-500 font-medium">Loading teams...</p>
            </div>
          ) : filteredTeams.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl shadow-lg text-gray-500">
              <Shield className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-xl font-medium">No teams found</p>
              <p className="text-sm text-gray-400">Create a new team to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeams.map((team) => (
                <div
                  key={team._id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`h-24 bg-gradient-to-r ${getRandomGradient()} p-6`}>
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-bold text-white truncate">
                        {team.name}
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-600 font-medium">
                        {team.players?.length || 0} Players
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => navigate(`/teams/${team._id}`)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium group"
                      >
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTeam(team._id);
                        }}
                        className="inline-flex items-center text-red-600 hover:text-red-800 font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <CreateTeamForm setIsOpen={setIsModalOpen} onTeamCreated={handleTeamCreated} />}
    </div>
  );
};

export default TeamsPage;
