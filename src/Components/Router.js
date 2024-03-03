import Home from "../Pages/Home";
import MatchPosts from "../Pages/MatchPosts/MatchPosts";
import PlayersPost from "../Pages/PlayersPost";
import Schedule from "../Pages/Schedule";
import Account from "../Pages/Account/Account";
import Messages from "../Pages//Chats/Chats";

import { Routes, Route } from "react-router-dom";

export default function NavRouter() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/match-posts" element={<MatchPosts />} />
      <Route path="/player-posts" element={<PlayersPost />} />
      <Route path="/account" element={<Account />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}
