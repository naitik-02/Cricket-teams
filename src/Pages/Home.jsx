import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-green-800">Welcome to Cricket Team Manager</h1>
          <p className="text-xl mb-8 text-green-700">Build, manage, and analyze your dream cricket team</p>
          <button className="btn btn-success btn-lg">Get Started</button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Create Your Team', description: 'Build and customize your dream cricket team with top players.' },
              { title: 'Top Players', description: 'Discover the best performers of the year and add them to your team.' },
              { title: 'Upcoming Matches', description: 'Stay updated with the latest match schedules and plan your strategy.' }
            ].map((feature, index) => (
              <div key={index} className="card shadow-lg">
                <div className="card-body">
                  <h3 className="card-title text-xl font-semibold mb-2 text-green-700">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-800">Cricket Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Player Performance', description: 'Analyze player statistics and make data-driven decisions.' },
              { title: 'Team Rankings', description: 'Track your teams progress and compete with others.' },
              { title: 'Player Market', description: 'Scout for new talent and strengthen your squad.' }
            ].map((insight, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-full p-6 mb-4 inline-block">
                  <i className={`fas fa-${index === 0 ? 'chart-line' : index === 1 ? 'trophy' : 'user-plus'} text-4xl text-green-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-700">{insight.title}</h3>
                <p className="text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to build your winning team?</h2>
          <p className="text-xl mb-8">Join Cricket Team Manager today and take your team to new heights!</p>
          <button className="btn btn-light btn-lg">Sign Up Now</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;