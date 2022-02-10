import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { IconButton, Typography } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
}));

function VariationForm({ index, variation, setState }) {
  return (
    <div elavation={0} style={{ marginTop: 10, flexDirection: 'row', display: 'flex', width: '100%', alignItems: 'center' }}>
      <TextField
        style={{flex: 3}}
        id="name"
        value={variation ? variation.name || "" : ""}
        label="Variation Name"
        onChange={(e) => {
          setState({ ...variation, name: e.target.value });
        }}
      />
      <TextField
        style={{flex: 3}}
        id="price"
        label="Price"
        value={variation ? variation.price || "" : ""}
        onChange={(e) => {
          setState({ ...variation, price: parseFloat(e.target.value) });
        }}
      />
      <div style={{width: 20}}>
      <IconButton aria-label="delete"  size="small" onClick={() => {
          setState(null, index)
        }}>
        <DeleteOutlined style={{color: 'red'}} fontSize="inherit" />
      </IconButton>
      </div>
      
    </div>
  );
}

export default function VariationsForm({ itemId, variations = [], setVariations }) {
  const classes = useStyles();
  const [state, setState] = useState({ count: variations.length });

  useEffect(() => {
    setState({
      count: variations.length,
    });
  }, [variations]);

  let VariationFormArray = [];

  for (let i = 0; i < state.count; i++) {
    VariationFormArray.push(
      <VariationForm
        key={`key-${i}`}
        setState={(variationState, index) => {
          let newVariations = [...variations];
          if (!variationState) {
            // User wants it removed
            let variationsWithoutIndex = newVariations.filter((item, j) => j !== index)
            return setVariations(variationsWithoutIndex);
          }
          if (!newVariations[i]) newVariations[i] = {};
          newVariations[i] = { ...newVariations[i], ...variationState, itemId };
          setVariations(newVariations);
        }}
        index={i}
        variation={variations[i]}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column",}}>
      <div style={{ fontFamily: "Roboto", marginTop: 20, marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
        <Typography className={classes.heading}>{"Variations"}</Typography>
        <IconButton aria-label="delete"  size="small" onClick={() => {
          setState({ ...state, count: state.count + 1 });
        }}>
        <AddCircleOutline fontSize="inherit" />
      </IconButton>
      </div>
     
      {VariationFormArray}      
    </div>
  );
}
