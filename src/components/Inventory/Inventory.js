import React, { useContext } from "react";
import ItemForm from "./ItemForm";

import Grid from "@material-ui/core/Grid";
import ItemList from "./ItemList";
import PollInstances from './PollInstances'
// import { Snackbar } from "@material-ui/core";
// import { Alert } from "@material-ui/lab";

const Inventory = () => {
  return (
    <div>
      <Grid container spacing={3}>        
        <Grid item xs={12}  md={4}>
          <ItemList />
        </Grid>
        <Grid item xs={12} md={4}>
          <ItemForm />
        </Grid>
        <Grid item xs={12} md={4}>
          <PollInstances />
        </Grid>
      </Grid>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default Inventory;
