import React, { useContext } from "react";
import ItemForm from "./ItemForm";

import Grid from "@material-ui/core/Grid";

const Inventory = () => {
  return (
    <div>
      <Grid container spacing={3}>        
        <Grid item xs={12} md={6}>
          <ItemForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Inventory;
