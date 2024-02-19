import { Grid, Card, Heading, Text, Badge } from "@aws-amplify/ui-react";
import "./TeamTables.css";
import { Avatar } from "@mui/material";

export function TeamDetails(props) {
  return <></>;
}

export function TeamRoster(props) {
  return (
    <Grid
      marginTop="20px"
      rowGap="1rem"
      columnGap="1rem"
      templateColumns={{
        base: "1fr",
        small: "1fr 1fr 1fr",
        large: "1fr 1fr 1fr 1fr",
      }}
    >
      <Card className="card">
        <Card className="avatar-container">
          <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
        </Card>
        <Card className="details">
          <Heading level={4}>Louie Meeks</Heading>
          <Text>Age: 21</Text>
          <Text>Number: 10</Text>
          <Text>Positions: <Badge backgroundColor="#404040">GK</Badge></Text>
        </Card>
      </Card>
      <Card className="card">
        <Card className="avatar-container">
          <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
        </Card>
        <Card className="details">
          <Heading level={4}>Louie Meeks</Heading>
          <Text>Age: 21</Text>
          <Text>Number: 10</Text>
          <Text>Positions: <Badge backgroundColor="#404040">GK</Badge></Text>
        </Card>
      </Card>
      <Card className="card">
        <Card className="avatar-container">
          <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
        </Card>
        <Card className="details">
          <Heading level={4}>Louie Meeks</Heading>
          <Text>Age: 21</Text>
          <Text>Number: 10</Text>
          <Text>Positions: <Badge backgroundColor="#404040">GK</Badge></Text>
        </Card>
      </Card>
      <Card className="card">
        <Card className="avatar-container">
          <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
        </Card>
        <Card className="details">
          <Heading level={4}>Louie Meeks</Heading>
          <Text>Age: 21</Text>
          <Text>Number: 10</Text>
          <Text>Positions: <Badge backgroundColor="#404040">GK</Badge></Text>
        </Card>
      </Card>
      <Card className="card">
        <Card className="avatar-container">
          <Avatar variant="square" sx={{ width: "100%", height: "100%" }} />
        </Card>
        <Card className="details">
          <Heading level={4}>Louie Meeks</Heading>
          <Text>Age: 21</Text>
          <Text>Number: 10</Text>
          <Text>Positions: <Badge backgroundColor="#404040">GK</Badge></Text>
        </Card>
      </Card>
    </Grid>
  );
}
