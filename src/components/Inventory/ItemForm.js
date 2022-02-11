import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import GreenColor from "@material-ui/core/colors/green";
import { InventoryContext } from "./InventoryProvider";
import Button from "@material-ui/core/Button";
import ChoicesForm from "./ChoicesForm";
import { Typography } from "@material-ui/core";
import SaveOutlined from "@material-ui/icons/SaveOutlined";
import CheckOutlined from "@material-ui/icons/CheckOutlined";
import Ajv from "ajv";

const ajv = new Ajv();

const validator = {
  create_item: ajv.compile({
    type: "object",
    properties: {
      name: { type: "string" },
      choices: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            itemId: { type: "string" },
          },
          required: ["name"],
        },
      },
    },
    required: ["name", "choices"],
    additionalProperties: false,
  }),
};

const filter = createFilterOptions();

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

function isValidItem(...args) {
  return validator["create_item"](...args);
}

export default function ItemForm() {
  const all = useContext(InventoryContext);
  const [state, setState] = useState({ saved: false });

  // useEffect(() => {
  //   console.log(all, "<<< Context");
  // }, [all]);

  useEffect(() => {
    if (!all.selectedItem) return;
    const choices = all.choices.filter(
      (v) => v.itemId === all.selectedItem.id
    );
    console.log("Setting state with selected item", all.selectedItem);
    setState({ ...all.selectedItem, choices });
  }, [all.selectedItem]);

  useEffect(() => {
    if (state.saved) {
      setTimeout(() => {
        setState({ ...state, saved: false });
      }, 1000);
    }
  }, [state.saved]);

  const payload = {
    name: state.name,
    choices: state.choices,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ textAlign: "right" }}
      >
        <Typography>
          {all.selectedItem ? "New Poll" : "Edit Poll"}
        </Typography>
      </div>
      <form noValidate autoComplete="off">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            id="name"
            label="Name"
            value={state.name || ""}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
         
          <ChoicesForm
            setChoices={(choices) => {
              setState({ ...state, choices });
            }}
            itemId={state.id}
            choices={state.choices || []}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: 20,
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: state.saved ? GreenColor["500"] : null }}
            color="primary"
            disabled={!isValidItem(payload)}
            startIcon={state.saved ? <CheckOutlined /> : <SaveOutlined />}
            onClick={() => {
              if (all.selectedItem) {
                all.dispatch({
                  type: "update_item",
                  id: state.id,
                  ...payload,
                });
              } else {
                all.dispatch({
                  type: "create_item",
                  ...payload,
                });
              }
              setState({ ...state, saved: true });
            }}
          >
            {all.selectedItem ? "Save Poll" : "Create Poll"}
          </Button>
          {all.selectedItem ? (
            <Button
              style={{ marginRight: 10 }}
              variant="outlined"
              color="primary"
              onClick={() => {
                all.dispatch({
                  type: "cancel_selected_item",
                });
                setState({});
              }}
            >
              Cancel
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
