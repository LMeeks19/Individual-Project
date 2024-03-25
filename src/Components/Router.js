import MatchPosts from "../Pages/MatchPosts/MatchPosts";
import PlayersPosts from "../Pages/PlayerPosts/PlayerPosts";
import Account from "../Pages/Account/Account";
import Messages from "../Pages/Chats/Chats";

import { Routes, Route } from "react-router-dom";

export default function NavRouter() {
  return (
    <Routes>
      <Route index path="/match-posts" element={<MatchPosts />} />
      <Route path="/player-posts" element={<PlayersPosts />} />
      <Route path="/account" element={<Account />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}
