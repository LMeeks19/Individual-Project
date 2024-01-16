import "@aws-amplify/ui-react/styles.css";
import React from "react";
import {
  defaultDarkModeOverride,
  ThemeProvider,
  Authenticator,
  Card,
} from "@aws-amplify/ui-react";
import { components, formFields } from "./Components/Authenticator";
import Layout from "./Components/Layout";
import { useRecoilValue } from "recoil";
import { themeState } from "./State/GlobalState";
import "./Components/Authenticator.css";

function App() {
  const colourMode = useRecoilValue(themeState);

  const theme = {
    name: "my-theme",
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colourMode}>
      <Card padding="0" height="100vh">
        <Authenticator
          className="authenticator"
          components={components}
          formFields={formFields}
        >
          <Layout />
        </Authenticator>
      </Card>
    </ThemeProvider>
  );
}

export default App;
