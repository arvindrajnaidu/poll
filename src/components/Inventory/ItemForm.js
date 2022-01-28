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

const ajv = new Ajv();

const validator = {
  create_item: ajv.compile({
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

function CategoriesInput({ catId, onSelected }) {
  const { categories, dispatch } = useContext(InventoryContext);
  const createdCat = useRef(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    if (!catId) {
      return setCategory(undefined);
    }
    setCategory(categories.find((c) => c.id === catId));
  }, [catId]);

  useEffect(() => {
    if (createdCat.current) {
      // A Cat was just added. Make it the current cat
      createdCat.current = false;
      onSelected(categories[categories.length - 1].id);
    }
  }, [categories]);

  return (
    <Autocomplete
      id="category"
      options={categories || []}
      freeSolo
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      //   defaultValue={catId || ''}
      //   value = {category ? {inputValue: category.id, title: category.name} : null}
      inputValue={category ? category.name : ""}
      onChange={(e, v) => {
        let result;
        if (typeof v === "string") {
          result = dispatch({
            type: "create_category",
            name: v,
          });
          createdCat.current = true;
        } else if (v && v.inputValue) {
          result = dispatch({
            type: "create_category",
            name: v.inputValue,
          });
          createdCat.current = true;
        } else if (v) {
          onSelected(v.id);
        }
      }}
      onInputChange={(e, v) => {
        setCategory({
          name: v,
        });
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // Suggest the creation of a new value
        if (params.inputValue !== "") {
          filtered.push({
            inputValue: params.inputValue,
            name: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name || "";
      }}
      //   getOptionLabel={(option) => option.name || ""}
      renderInput={(params) => (
        <TextField {...params} label="Category" margin="normal" />
      )}
    />
  );

  //   return (
  //     <Autocomplete
  //       id="category"
  //       options={categories || []}
  //       value={category || {}}
  //       inputValue={category ? category.name : ""}
  //       onInputChange={(e, v) => {
  //         setCategory({ name: v });
  //       }}
  //       freeSolo
  //       onChange={(e, v) => {
  //         console.log(e, v);
  //         if (typeof v === "string") {
  //           dispatch({
  //             type: "create_category",
  //             name: v,
  //           });
  //         } else if (v) {
  //           onSelected(v.id);
  //         }
  //       }}
  //       getOptionLabel={(option) => option.name || ""}
  //       renderInput={(params) => (
  //         <TextField {...params} label="Category" margin="normal" />
  //       )}
  //     />
  //   );
}

function isValidItem(...args) {
  return validator["create_item"](...args);
}

export default function ItemForm() {
  const classes = useStyles();
  const all = useContext(InventoryContext);
  const [state, setState] = useState({ saved: false });

  //   useEffect(() => {
  //     // console.log(state, "<<< State");
  //     // const payload = {
  //     //     name: state.name,
  //     //     catId: state.catId,
  //     //     variations: state.variations,
  //     // };

  //     // setState({isValidItem : })
  //   }, [state]);

  useEffect(() => {
    console.log(all, "<<< Context");
  }, [all]);

  useEffect(() => {
    if (!all.selectedItem) return;
    const variations = all.variations.filter(
      (v) => v.itemId === all.selectedItem.id
    );
    console.log("Setting state with selected item", all.selectedItem);
    setState({ ...all.selectedItem, variations });
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
    catId: state.catId,
    variations: state.variations,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{ textAlign: "right" }}
      >
        <Typography>
          {all.selectedItem ? "New Item Form" : "Edit Item Form"}
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
          <CategoriesInput
            catId={state.catId || null}
            onSelected={(catId) => {
              setState({
                ...state,
                catId,
              });
            }}
          />
          <VariationsForm
            setVariations={(variations) => {
              setState({ ...state, variations });
            }}
            itemId={state.id}
            variations={state.variations || []}
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
            {all.selectedItem ? "Save Item" : "Create Item"}
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
