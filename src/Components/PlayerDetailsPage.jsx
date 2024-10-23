import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../Context/PlayerContext';
import Loading from './Loading';

const PlayerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { player, FetchPlayerID } = usePlayerContext();

  const [loading , setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (id) {
      FetchPlayerID(id);
      setLoading(false)
    }
setLoading(false)
  }, [id, FetchPlayerID]);

  if (loading) {
    return (
      <Loading/>
    );
  }

  if (!player) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Player not found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">{player.name}</h1>
            <button
              onClick={() => navigate('/players')}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Back to List
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Position</h3>
                <p className="mt-1 text-lg text-gray-900">{player.position}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Points</h3>
                <p className="mt-1 text-lg text-gray-900">{player.points}</p>
              </div>
             
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;
