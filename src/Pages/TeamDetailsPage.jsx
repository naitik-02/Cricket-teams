import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTeamContext } from '../Context/TeamContext';
import { usePlayerContext } from '../Context/PlayerContext';
import Loading from '../Components/Loading';

const MAX_PLAYERS = 11;

const TeamDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchTeamById, team, updateTeamPlayers, loading } = useTeamContext();
  const { players } = usePlayerContext();
  const [selectedPlayerId, setSelectedPlayerId] = useState('');
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const loadTeam = useCallback(async () => {
    try {
      if (id) {
        await fetchTeamById(id);
      }
    } catch (err) {
      setError('Failed to load team details');
      console.error(err);
    }
  }, [id, fetchTeamById]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const getAvailablePlayers = useCallback(() => {
    if (!players || !team?.players) return [];
    return players.filter(player => 
      !team.players.some(teamPlayer => teamPlayer._id === player._id)
    );
  }, [players, team?.players]);

  const calculateTotalPoints = useCallback(() => {
    if (!team?.players) return 0;
    return team.players.reduce((total, player) => total + player.points, 0);
  }, [team?.players]);

  const handleAddPlayer = async () => {
    if (!selectedPlayerId) return;

    if (team?.players?.length >= MAX_PLAYERS) {
      setAlertMessage(`Team cannot have more than ${MAX_PLAYERS} players`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    try {
      await updateTeamPlayers(id, selectedPlayerId, 'add');
      setSelectedPlayerId('');
      
      // Re-fetch team details to reflect the updated state
      await loadTeam();
    } catch (error) {
      setError('Failed to add player');
      console.error('Failed to add player:', error);
    }
  };

  const handleRemovePlayer = async (playerId) => {
    try {
      await updateTeamPlayers(id, playerId, 'remove');
      
      // Re-fetch team details to reflect the updated state
      await loadTeam();
    } catch (error) {
      setError('Failed to remove player');
      console.error('Failed to remove player:', error);
    }
  };

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">{team?.name || 'Team Details'}</h1>
          <button
            onClick={() => navigate('/teams')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Teams
          </button>
        </div>

        <div className="p-6">
          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-600">Total Points</h3>
              <p className="text-2xl font-bold text-blue-900">{calculateTotalPoints()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-green-600">Players</h3>
              <p className="text-2xl font-bold text-green-900">{team?.players?.length || 0}/{MAX_PLAYERS}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-purple-600">Created</h3>
              <p className="text-lg font-semibold text-purple-900">
                {team?.createdAt ? new Date(team.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>

          {/* Alert Message */}
          {showAlert && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {alertMessage}
            </div>
          )}

          {/* Players List */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Team Players</h2>
            {team?.players?.length > 0 ? (
              <div className="space-y-3">
                {team.players.map((player) => (
                  <div key={player._id} 
                       className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-md">
                        {player.position }
                      </span>
                      <span className="font-medium">{player.name}</span>
                      <span className="text-gray-600 text-sm">({player.points} points)</span>
                    </div>
                    <button
                      onClick={() => handleRemovePlayer(player._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                No players in this team yet.
              </p>
            )}
          </div>

          {/* Add Player Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Add New Player</h3>
            <div className="flex gap-3">
              <select
                value={selectedPlayerId}
                onChange={(e) => setSelectedPlayerId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select a player</option>
                {getAvailablePlayers().map((player) => (
                  <option key={player._id} value={player._id}>
                    {player.name} - {player.position} ({player.points} points)
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddPlayer}
                disabled={!selectedPlayerId}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Add Player
              </button>
            </div>
            {getAvailablePlayers().length === 0 && players?.length > 0 && (
              <p className="text-sm text-gray-500 mt-2">No available players to add.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
