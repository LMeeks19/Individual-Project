import React from "react";
import NavRouter from './Router';
import SideBar from "./SideBar";
import { Card } from "@aws-amplify/ui-react";
import NavBar from "./NavBar";
import "./Layout.css";

import {
  BrowserRouter as Router,
} from "react-router-dom";

export default function Layout() {
  return (
    <Router>
      <Card className="layout">
        <NavBar />
        <SideBar />
        <NavRouter />
      </Card>
    </Router>
  );
}
