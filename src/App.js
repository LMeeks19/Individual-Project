import "@aws-amplify/ui-react/styles.css";
import React from "react";
import { ThemeProvider, Authenticator, Card } from "@aws-amplify/ui-react";
import { components, formFields } from "./Components/Authenticator";
import { useRecoilValue } from "recoil";
import { themeState } from "./State/GlobalState";
import NavBar from "./Components/NavBar";
import NavRouter from "./Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  const colourMode = useRecoilValue(themeState);

  const theme = {
    name: "my-theme",
    overrides: [
      {
        colorMode: "dark",
        tokens: {
          colors: {
            font: {
              primary: { value: "#fff" },
              secondary: { value: "#fff" },
            },
            background: {
              primary: { value: "#404040" },
            },
          },
        },
      },
    ],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colourMode}>
      <Card className="layout" padding="0">
        <Authenticator
          className="authenticator"
          components={components}
          formFields={formFields}
        >
          <Router>
            <NavBar />
            <NavRouter />
          </Router>
        </Authenticator>
      </Card>
    </ThemeProvider>
  );
}

export default App;
