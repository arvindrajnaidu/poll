import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { InventoryContext } from "./InventoryProvider";
import Button from "@material-ui/core/Button";
import { IconButton, Paper, Switch, Typography } from "@material-ui/core";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import InventoryGroup from './InventoryGroup'

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

function ChoiceForm({ index, choice, setState }) {
  return (
    <div elavation={0} style={{ marginTop: 10, flexDirection: 'row', display: 'flex', width: '100%', alignItems: 'center' }}>
      <TextField
        style={{flex: 3}}
        id="name"
        value={choice ? choice.name || "" : ""}
        label="Choice"
        onChange={(e) => {
          setState({ ...choice, name: e.target.value });
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

export default function ChoicesForm({ itemId, choices = [], setChoices }) {
  const classes = useStyles();
  const [state, setState] = useState({ count: choices.length });

  useEffect(() => {
    setState({
      count: choices.length,
    });
  }, [choices]);

  function onGroupSelected (choiceGroup) {
    let addedChoices = choiceGroup.choices.map(v => ({...v, itemId}))
    setChoices(addedChoices);
  }

  let ChoiceFormArray = [];

  for (let i = 0; i < state.count; i++) {
    ChoiceFormArray.push(
      <ChoiceForm
        key={`key-${i}`}
        setState={(choiceState, index) => {
          let newChoices = [...choices];
          if (!choiceState) {
            // User wants it removed
            let choicesWithoutIndex = newChoices.filter((item, j) => j !== index)
            return setChoices(choicesWithoutIndex);
          }
          if (!newChoices[i]) newChoices[i] = {};
          newChoices[i] = { ...newChoices[i], ...choiceState, itemId };
          setChoices(newChoices);
        }}
        index={i}
        choice={choices[i]}
      />
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column",}}>
      <div style={{ fontFamily: "Roboto", marginTop: 20, marginBottom: 10, display: 'flex', justifyContent: 'space-between'}}>
        <Typography className={classes.heading}>{"Choices"}</Typography>
        <IconButton aria-label="delete"  size="small" onClick={() => {
          setState({ ...state, count: state.count + 1 });
        }}>
        <AddCircleOutline fontSize="inherit" />
      </IconButton>
      </div>
      {ChoiceFormArray}  
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      < InventoryGroup onGroupSelected={onGroupSelected} />
      </div>
    </div>
  );
}
