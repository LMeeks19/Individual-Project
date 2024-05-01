import * as React from "react";
import { Flex } from "@aws-amplify/ui-react";
import { CircularProgress } from "@mui/material";
import "./PreLoadScreen.css";

// Implementation of the pre load screen component

export default function PreLoadScreen() {
  return (
    <Flex className="loading-container">
        <CircularProgress />
    </Flex>
  );
}
