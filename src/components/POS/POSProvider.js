import React, {
  useEffect,
  createContext,
  useState,
  useReducer,
  useContext,
} from "react";

import { InventoryContext } from "../Inventory/InventoryProvider";
// import { menuData } from './menu-fixture';
export const POSContext = createContext({});

const initialState = { order: { lineItems: {}, total: 0.0 } };

function reducer(state, action) {
  switch (action.type) {
    case "add-item": {
      let newOrder = { ...state.order };
      let { lineItems } = newOrder;
      if (!lineItems[action.id])
        lineItems[action.id] = {
          qty: 0,
          name: action.name,
          price: action.price,
        };
      lineItems[action.id].qty = lineItems[action.id].qty + 1;
      newOrder.total = Object.keys(lineItems).reduce((acc, varId) => {
        acc = acc + lineItems[varId].price * lineItems[varId].qty;
        return acc;
      }, 0.0);
      // console.log(newOrder)
      return { ...state, order: newOrder };
    }
    case "remove-item":
      let newOrder = { ...state.order };
      if (!newOrder[action.id]) return;
      if (newOrder[action.id] === 0) return;
      newOrder[action.id] = newOrder[action.id] - 1;
      return { ...state, order: newOrder };
    default:
      return state;
  }
}

export const POSProvider = ({ children }) => {
  const { categories, items, variations } = useContext(InventoryContext);
  const [menu, setMenu] = useState({ name: "Catalog", items });
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!categories) return;
    let dbMenu = categories.map((cat) => {
      return {
        name: cat.name,
        items: items
          .filter((i) => i.catId === cat.id)
          .map((i) => {
            return {
              name: i.name,
              items: variations.filter((v) => v.isAvailable && v.itemId === i.id),
            };
          }).filter(i => i.items.length)
      };
    }).filter(cat => cat.items.length)
    // console.log(dbMenu, '<<< dbMenu')
    setMenu({ name: "Catalog", items: dbMenu });
  }, [categories, items, variations]);

  return (
    <POSContext.Provider value={{ menu, ...state, dispatch }}>
      {children}
    </POSContext.Provider>
  );
};

export default POSProvider;
