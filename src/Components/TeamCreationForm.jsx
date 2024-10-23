import React, { useState } from 'react';
import { usePlayerContext } from '../Context/PlayerContext';
import { useTeamContext } from '../Context/TeamContext';

const CreateTeamForm = ({ setIsOpen }) => {
  const [teamName, setTeamName] = useState('');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [error, setError] = useState('');
  const { players } = usePlayerContext();
  const { createTeam , fetchMyTeams } = useTeamContext();
  const [loading, setLoading] = useState(false);

  const MAX_PLAYERS = 11;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchMyTeams()
    
    if (selectedPlayers.length > MAX_PLAYERS) {
      setError(`You can't select more than ${MAX_PLAYERS} players`);
      return;
    }

    const newTeam = {
      name: teamName,
      players: selectedPlayers
    };

    try {
      setLoading(true);
      await createTeam(newTeam);
      setTeamName('');
      setSelectedPlayers([]);
      setIsOpen(false);
    } catch (error) {
      setError('Failed to create team. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlayerSelect = (playerId) => {
    setSelectedPlayers(prev => {
      if (prev.includes(playerId)) {
        return prev.filter(id => id !== playerId);
      }
      if (prev.length >= MAX_PLAYERS) {
        setError(`You can't select more than ${MAX_PLAYERS} players`);
        return prev;
      }
      setError('');
      return [...prev, playerId];
    });
  };

  const getSelectedPlayerCount = () => {
    return `${selectedPlayers.length}/${MAX_PLAYERS} players selected`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg relative animate-fade-in">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Team</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="teamName" className="text-sm font-semibold text-gray-700">
                Team Name
              </label>
              <input
                id="teamName"
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter team name"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-700">
                  Select Players
                </label>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  {getSelectedPlayerCount()}
                </span>
              </div>
              
              <div className="overflow-y-auto max-h-64 rounded-lg border border-gray-200 bg-gray-50">
                <div className="p-4 space-y-2">
                  {players.map((player) => (
                    <div
                      key={player._id}
                      onClick={() => handlePlayerSelect(player._id)}
                      className={`
                        p-3 rounded-lg cursor-pointer transition-all
                        ${selectedPlayers.includes(player._id)
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'bg-white hover:bg-gray-100 border-gray-200'}
                        border
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{player.name}</p>
                          <p className="text-sm text-gray-500">{player.position}</p>
                        </div>
                        {selectedPlayers.includes(player._id) && (
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!teamName || selectedPlayers.length === 0 || loading}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : 'Create Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamForm;