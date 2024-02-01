import "@aws-amplify/ui-react/styles.css";
import React from "react";
import {
  ThemeProvider,
  Authenticator,
  Card,
} from "@aws-amplify/ui-react";
import { components, formFields } from "./Components/Authenticator";
import { useRecoilValue } from "recoil";
import { themeState } from "./State/GlobalState";
import NavBar from "./Components/NavBar";
import NavRouter from "./Components/Router";
import { BrowserRouter as Router } from "react-router-dom";
import "./Components/Authenticator.css";
import "./App.css";

function App() {
  const colourMode = useRecoilValue(themeState);

  const theme = {
    name: "my-theme",
    overrides: [
      {
        colorMode: 'dark',
        tokens: {
          colors: {
            font: {
              primary: { value: '#fff' },
            },
            background: {
              primary: { value: '#404040' },

            },
          },
        },
      },
    ],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colourMode}>
      <Authenticator
        className="authenticator"
        components={components}
        formFields={formFields}
      >
        <Card padding="0">
          <Router>
            <NavBar />
            <NavRouter />
          </Router>
        </Card>
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;
