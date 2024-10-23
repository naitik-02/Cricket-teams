import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayerContext } from '../Context/PlayerContext';
import { useTeamContext } from '../Context/TeamContext';
import { TrendingUp, Award, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { players, loading: playersLoading } = usePlayerContext();
  const { teams, myTeams, loading: teamsLoading } = useTeamContext();
  
  // Combine loading states for both contexts
  const isLoading = playersLoading || teamsLoading;

  const features = [
    {
      title: 'Player Management',
      description: 'Streamline your player operations with comprehensive stats tracking and team assignment tools.',
      count: isLoading ? 'Loading...' : players?.length || 0,
      path: '/players',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      title: 'Team Management',
      description: 'Create and optimize teams with advanced player assignment and performance analytics.',
      count: isLoading ? 'Loading...' : myTeams?.length || 0,
      path: '/myTeams',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  const stats = [
    {
      title: 'Total Players',
      value: isLoading ? 'Loading...' : players?.length || 0,
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Teams',
      value: isLoading ? 'Loading...' : myTeams?.length || 0,
      icon: <Award className="w-6 h-6" />,
      color: 'bg-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Professional Team Management Solution
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Elevate your team's performance with our comprehensive management platform
            </p>
            <button
              onClick={() => navigate('/players')}
              className="inline-flex items-center px-8 py-4 rounded-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {!isLoading ? (
        <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">System Overview</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                <p className="text-sm font-medium text-blue-600 mb-1">Total Players</p>
                <p className="text-4xl font-bold text-blue-900">{players?.length || 0}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl">
                <p className="text-sm font-medium text-emerald-600 mb-1">Total Teams</p>
                <p className="text-4xl font-bold text-emerald-900">{teams?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center py-16">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        </div>
      )}

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Powerful Management Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(feature.path)}
              className="group bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="bg-blue-100 p-4 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <span className="text-3xl font-bold text-blue-600 group-hover:text-blue-800">
                  {feature.count}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
