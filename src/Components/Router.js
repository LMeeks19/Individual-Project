import MatchPosts from "../Pages/MatchPosts/MatchPosts";
import PlayersPosts from "../Pages/PlayerPosts/PlayerPosts";
import Account from "../Pages/Account/Account";
import Messages from "../Pages/Chats/Chats";

import { Routes, Route } from "react-router-dom";
import Schedule from "../Pages/Schedule/Schedule";

export default function NavRouter() {
  return (
    <Routes>
      <Route index path="/schedule" element={<Schedule />} />
      <Route path="/match-posts" element={<MatchPosts />} />
      <Route path="/player-posts" element={<PlayersPosts />} />
      <Route path="/account" element={<Account />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}
