import React, { useContext } from "react";

import InventoryProvider from "./InventoryProvider";
import SettingsForm from "./SettingsForm";

import Grid from "@material-ui/core/Grid";

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export default function (args) {
  return (
    <InventoryProvider>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}/>
          <Grid item xs={12} md={6}>
            <SettingsForm />
          </Grid>
          <Grid item xs={12} md={3}/>
        </Grid>
      </div>
    </InventoryProvider>
  );
}
