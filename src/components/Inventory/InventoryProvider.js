import React, {
  useEffect,
  createContext,
  useState,
  useReducer,
  useContext,
} from "react";
import { v4 as uuid } from "uuid";
import { AppContext } from "../AppProvider";
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// import firebase from "firebase/app";
// import "firebase/database";

export const InventoryContext = createContext({});

const intialState = {
  items: [],
  choices: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "load_inventory": {
      return { ...action.inventory };
    }
    case "set_selected_item": {
      let selectedItem = state.items.find((i) => i.id === action.id);
      return { ...state, selectedItem };
    }
    case "cancel_selected_item": {
      let cancelledState = { ...state };
      delete cancelledState.selectedItem;
      return cancelledState;
    }

    case "create_item": {
      let { name, choices } = action;
      let items = [...state.items];
      let itemId = uuid();
      items.push({
        id: itemId,
        name,
      });

      let newChoices = choices.map((v) => {
        return {
          price: v.price,
          name: v.name || "Regular",
          id: uuid(),
          itemId,
          isAvailable: true,
        };
      });
      return {
        ...state,
        items,
        choices: [...state.choices, ...newChoices],
      };
    }
    case "delete_item": {
      let { id } = action;
      let items = [...state.items].filter((i) => i.id !== id);
      let choices = [...state.choices].filter((v) => v.itemId !== id);
      return { ...state, items, choices };
    }
    case "update_item": {
      // During updates a variant may have been added
      let updatedItemChoices = action.choices.map((v) => {
        if (!v.id) {
          v.id = uuid();
        }
        return v;
      });
      let choicesWithoutThisItem = state.choices.filter(
        (v) => v.itemId !== action.id
      );
      let updateItems = [...state.items].map((i) => {
        if (i.id === action.id) {
          return {
            ...i,
            name: action.name || i.name,
            isAvailable: !!action.isAvailable,
          };
        }
        return i;
      });
      return {
        ...state,
        choices: [...choicesWithoutThisItem, ...updatedItemChoices],
        items: updateItems,
      };
    }
    case "update_choice": {
      // During updates a variant may have been added
      let updatedChoices = state.choices.map((v) => {
        if (v.id === action.id) {
          return { ...v, isAvailable: action.isAvailable };
        }
        return v;
      });

      return {
        ...state,
        choices: updatedChoices,
      };
    }
    default:
      return state;
  }
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [didLoadFromStorage, setDidLoadFromStorage] = useState(false);
  const {keyValueStore} = useContext(AppContext)

  useEffect(() => {
    keyValueStore.getItem("poll_inventory").then((inventory) => {
      setDidLoadFromStorage(true);
      if (!inventory) return;
      dispatch({
        type: "load_inventory",
        inventory,
      });
    });
  }, []);

  useEffect(() => {
    if (!didLoadFromStorage) return;
    // console.log("Writing inventory");
    const { choices, items } = state;
    const dbState = {
      choices,
      items,
    };
    // Write to storage
    keyValueStore.setItem("poll_inventory", dbState);
  }, [state]);

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default AppProvider;
