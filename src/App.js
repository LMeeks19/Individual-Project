import "@aws-amplify/ui-react/styles.css";
import React from "react";
import { ThemeProvider, Authenticator, Card } from "@aws-amplify/ui-react";
import { components, formFields } from "./Components/Authenticator";
import { useRecoilValue } from "recoil";
import { themeState } from "./Functions/GlobalState";
import Page from "./Pages/Page";
import { theme } from "./Functions/Theme";
import "./App.css";

function App() {
  const colourMode = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={theme} colorMode={colourMode}>
      <Card className="app" padding="0">
        <Authenticator
          className="authenticator"
          components={components}
          formFields={formFields}
        >
          <Page />
        </Authenticator>
      </Card>
    </ThemeProvider>
  );
}

export default App;
