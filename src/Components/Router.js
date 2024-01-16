import Home from "../Pages/Home";
import MatchPost from "../Pages/MatchPost";
import PlayersPost from "../Pages/PlayersPost";
import Schedule from "../Pages/Schedule"
import Profile from "../Pages/Profile";
import Settings from "../Pages/Settings";

import {
    Routes,
    Route,
  } from "react-router-dom";

export default function NavRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/match-post" element={<MatchPost />} />
      <Route path="/players-post" element={<PlayersPost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
