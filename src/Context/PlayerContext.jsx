import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../main";

const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [players, setPlayers] = useState(null);
  const [player, setPlayer] = useState();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const FetchPlayers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/players/all`, {
        headers: {token} },
      );
      setPlayers(response.data.players);
      setLoading(false);
      console.log("Fetched Players:", response.data.players); // Debugging log
    } catch (error) {
      setLoading(false);
      console.error(error.message);
      
    }
  };
  const FetchPlayerID = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/players/${id}`, {
        headers: {token} },
      );
      setPlayer(response.data.player);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      
    }
  };

  useEffect(() => {
    FetchPlayers();
  }, []);

  return (
    <PlayerContext.Provider
      value={{ players, player, FetchPlayers, FetchPlayerID }}
    >
      {children}
      <ToastContainer />
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);
