import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/Home";
import SignInPage from "./Pages/Login";
import SignUpPage from "./Pages/Register";
import PlayerDetailsPage from "./Components/PlayerDetailsPage";
import PlayersListPage from "./Components/PlayerList";
import TeamsPage from "./Components/TeamPageComponent";
import { useUserContext } from "./Context/UserContext";
import { useTeamContext } from "./Context/TeamContext";
import TeamDetailsPage from "./Pages/TeamDetailsPage";
import Loading from "./Components/Loading";
import CreateTeamForm from "./Components/TeamCreationForm";
const App = () => {
  const { isAuth , loading } = useUserContext();

  return (

    <>
    
    {loading ? (
        <Loading />
      ) : (
        <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={isAuth ? <HomePage /> : <SignInPage />} />
            <Route
              path="/players"
              element={isAuth ? <PlayersListPage /> : <SignInPage />}
            />
            <Route
              path="/players/:id"
              element={isAuth ? <PlayerDetailsPage /> : <SignInPage />}
            />
           
            <Route
              path="/myTeams"
              element={isAuth ? <TeamsPage /> : <SignInPage />}
            />
            <Route
              path="/teams/:id"
              element={isAuth ? <TeamDetailsPage /> : <SignInPage />}
            />
            <Route
              path="/teams/new"
              element={isAuth ? <CreateTeamForm /> : <SignInPage />}
            />
            <Route
              path="/signin"
              element={ <SignInPage />}
            />
            <Route
              path="/signup"
              element={ <SignUpPage /> }
            />
          </Routes>
        </div>
      </Router>
      )}
    </>
  
  );
};

export default App;
