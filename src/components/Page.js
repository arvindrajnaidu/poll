import './Page.css'
import React, { useContext } from "react";
import { Container } from "@material-ui/core";

import Inventory from "./Inventory";


export default function Page() {
  return (
    <div className={'page'}>
      <Container
        style={{
          padding: 20,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Inventory />
      </Container>
    </div>
  );
}
