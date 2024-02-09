import Home from "../Pages/Home";
import MatchPost from "../Pages/MatchPost";
import PlayersPost from "../Pages/PlayersPost";
import Schedule from "../Pages/Schedule";
import ViewAccount from "../Pages/Account/ViewAccount";
import EditAccount from "../Pages/Account/EditAccount";
import Messages from "../Pages/Messages";

import { Routes, Route } from "react-router-dom";

export default function NavRouter() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/match-posts" element={<MatchPost />} />
      <Route path="/player-posts" element={<PlayersPost />} />
      <Route path="/view-account" element={<ViewAccount />} />
      <Route path="/edit-account" element={<EditAccount />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}
