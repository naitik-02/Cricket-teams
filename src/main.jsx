import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserContextProvider } from "./Context/UserContext.jsx";
import { PlayerContextProvider } from "./Context/PlayerContext.jsx";
import { TeamContextProvider } from "./Context/TeamContext.jsx";

export const server = "http://localhost:5000/api";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
        <PlayerContextProvider>
      <TeamContextProvider>
          <App />
      </TeamContextProvider>
        </PlayerContextProvider>
    </UserContextProvider>
  </StrictMode>
);
