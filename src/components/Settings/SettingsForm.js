import React, { useContext, useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import GreenColor from "@material-ui/core/colors/green";
import { InventoryContext } from "./InventoryProvider";
import Button from "@material-ui/core/Button";
import VariationsForm from "./VariationsForm";
import { Typography } from "@material-ui/core";
import SaveOutlined from "@material-ui/icons/SaveOutlined";
import CheckOutlined from "@material-ui/icons/CheckOutlined";
import Ajv from "ajv";
import { AppContext } from "../AppProvider";

const ajv = new Ajv();

const validator = {
  update_settings: ajv.compile({
    type: "object",
    properties: {
      name: { type: "string" },
      catId: { type: "string" },
      variations: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            price: { type: "integer" },
            itemId: { type: "string" },
          },
          required: ["name", "price"],
        },
      },
    },
    required: ["name", "catId", "variations"],
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
  return validator["update_settings"](...args);
}

export default function SettingsForm() {
  const {dispatch, settings} = useContext(AppContext);
  const [state, setState] = useState({ saved: false, ...settings });

  useEffect(() => {
    if (state.saved) {
      setTimeout(() => {
        setState({ ...state, saved: false });
      }, 1000);
    }
  }, [state.saved]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ textAlign: "right" }}
      >
        <Typography>
          {"Seller Settings"}
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
          <TextField
            id="address"
            label="Address"
            value={state.address || ""}
            onChange={(e) => {
              setState({ ...state, address: e.target.value });
            }}
          />
          <TextField
            id="phone"
            label="Phone"
            value={state.phone || ""}
            onChange={(e) => {
              setState({ ...state, phone: e.target.value });
            }}
          />
          <TextField
            id="upi"
            label="UPI"
            value={state.upi || ""}
            onChange={(e) => {
              setState({ ...state, upi: e.target.value });
            }}
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
            // disabled={!isValidItem(payload)}
            startIcon={state.saved ? <CheckOutlined /> : <SaveOutlined />}
            onClick={() => {
              dispatch({
                type: "save-settings",
                ...state,
              });              
              setState({ ...state, saved: true });
            }}
          >
            {"Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
