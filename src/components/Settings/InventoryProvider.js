import React, {
  useEffect,
  createContext,
  useState,
  useReducer,
  useContext,
} from "react";
import { v4 as uuid } from "uuid";
// import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";

// import firebase from "firebase/app";
// import "firebase/database";

export const InventoryContext = createContext({});

const catalogId = uuid();
const catId = uuid();
const itemId = uuid();
const variationId1 = uuid();
const variationId2 = uuid();

const intialState = {
  catalogs: [
    {
      id: catalogId,
      name: "morning",
      from: 6,
      to: 11,
      items: [itemId],
    },
  ],
  categories: [
    {
      id: catId,
      name: "Mexican",
    },
  ],
  items: [
    {
      id: itemId,
      name: "Burrito",
      catId,
    },
  ],
  variations: [
    {
      id: variationId1,
      itemId,
      name: "Wet",
      price: 10.45,
    },
    {
      id: variationId2,
      itemId,
      name: "Eggs and cheese",
      price: 12.45,
    },
  ],
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
    case "create_category": {
      let categories = [...state.categories];
      categories.push({
        id: uuid(),
        name: action.name,
      });
      return { ...state, categories };
    }
    case "delete_category": {
      let categories = state.categories.filter((c) => c.id !== action.id);
      return { ...state, categories };
    }
    case "update_categofy": {
      let categories = state.categories.map((c) => {
        if (c.id === action.id) {
          return {
            id: c.id,
            name: action.name,
          };
        }
        return c;
      });
      return { ...state, categories };
    }

    case "create_item": {
      let { catId, catName, name, variations } = action;
      let categories = [...state.categories];
      if (catName && !catId) {
        catId = uuid();
        categories.push({
          id: catId,
          name: action.catName,
        });
      }

      let items = [...state.items];
      let itemId = uuid();
      items.push({
        id: itemId,
        catId,
        name,
      });

      let newVariations = variations.map((v) => {
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
        categories,
        items,
        variations: [...state.variations, ...newVariations],
      };
    }
    case "delete_item": {
      let { id } = action;
      let items = [...state.items].filter((i) => i.id !== id);
      let variations = [...state.variations].filter((v) => v.itemId !== id);
      return { ...state, items, variations };
    }
    case "update_item": {
      // During updates a variant may have been added
      let updatedItemVariations = action.variations.map((v) => {
        if (!v.id) {
          v.id = uuid();
        }
        return v;
      });
      let variationsWithoutThisItem = state.variations.filter(
        (v) => v.itemId !== action.id
      );
      let updateItems = [...state.items].map((i) => {
        if (i.id === action.id) {
          return {
            ...i,
            name: action.name || i.name,
            catId: action.catId || i.catId,
            isAvailable: !!action.isAvailable,
          };
        }
        return i;
      });
      return {
        ...state,
        variations: [...variationsWithoutThisItem, ...updatedItemVariations],
        items: updateItems,
      };
    }
    case "update_variation": {
      // During updates a variant may have been added
      let updatedVariations = state.variations.map(
        (v) => {
          if (v.id === action.id) {
            return {...v, isAvailable: action.isAvailable}
          }
          return v
        }
      );
      
      return {
        ...state,
        variations: updatedVariations,
      };
    }
    default:
      return state;
  }
}

const AppProvider = ({ children, claims }) => {
  const [state, dispatch] = useReducer(reducer, intialState);
  const [didLoadFromStorage, setDidLoadFromStorage] = useState(false);
  useEffect(() => {
    const inventoryStr = window.localStorage.getItem("inventory");
    setDidLoadFromStorage(true);
    if (!inventoryStr) return;
    // console.log("Loading", inventoryStr);
    dispatch({
      type: "load_inventory",
      inventory: JSON.parse(inventoryStr),
    });
  }, []);

  useEffect(() => {
    if (!didLoadFromStorage) return;
    // console.log("Writing inventory");
    const { categories, variations, items, catalogs } = state;
    const dbState = {
      categories,
      variations,
      items,
      catalogs,
    };
    window.localStorage.setItem("inventory", JSON.stringify(dbState));
  }, [state]);

  return (
    <InventoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InventoryContext.Provider>
  );
};

export default AppProvider;
