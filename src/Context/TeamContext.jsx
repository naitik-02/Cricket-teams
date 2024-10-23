import axios from "axios";
import { useContext, createContext, useState, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../main";

const TeamContext = createContext();

export const TeamContextProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [myTeams, setMyTeams] = useState([]);
  const [team, setTeam] = useState(null); // Initialize as null instead of empty array
  const [loading, setLoading] = useState(false);
 
  const token = localStorage.getItem("token");

  // Fetch all teams
  const FetchAllTeams = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/teams`, {
        headers: { token },
      });
      setTeams(data.teams || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);
 
  const fetchMyTeams = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/myteam`, {
        headers: { token },
      });
      setMyTeams(data.teams || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch a single team by ID
  const fetchTeamById = useCallback(async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/team/${id}`, {
        headers: { token }
      });
      setTeam(data.team);
    } catch (error) {
      console.error(error);
      throw error; // Propagate error to component
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Create a new team
  const createTeam = useCallback(async (teamData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/team/new`, teamData, {
        headers: { token },
      });
      setTeams(prevTeams => [...prevTeams, data.team]);
      return data.team;
    } catch (error) {
      console.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Update team's players
  const updateTeamPlayers = useCallback(async (id, playerId, action) => {
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${server}/team/${id}`,
        { action, playerId },
        {
          headers: { token },
        }
      );
      
      // Update local state
      setTeam(data.team);
      toast.success(data.message)
      // Update teams list if necessary
      await FetchAllTeams();
      await fetchMyTeams();
      
      return data.team;
    } catch (error) {
      console.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token, FetchAllTeams, fetchMyTeams]);

  // Delete a team by ID
  const deleteTeam = useCallback(async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${server}/teams/${id}`, {
        headers: { token },
      });
      setTeams(prevTeams => prevTeams.filter(team => team._id !== id));
      toast.success("Team Deleted Successfully")
       FetchAllTeams();
    } catch (error) {
      console.error(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [token, FetchAllTeams]);

useState(()=>{
  fetchMyTeams();
  FetchAllTeams()
},[deleteTeam])
  

  const value = {
    teams,
    myTeams,
    team,
    loading,
    FetchAllTeams,
    fetchMyTeams,
    fetchTeamById,
    createTeam,
    updateTeamPlayers,
    deleteTeam,
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeamContext = () => useContext(TeamContext);