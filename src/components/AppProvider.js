import React, { useEffect, createContext, useState, useReducer } from "react";

export const AppContext = createContext({});

const initialState = { call: null, order: { lineItems: {}, total: 0.0 } };

function reducer(state, action) {
  switch (action.type) {
    case "set-call":
      console.log("SEtting call");
      return { ...state, call: action.call };
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
      return { ...state, order: newOrder };
    }
    case "remove-item":
      let newOrder = { ...state.order };
      if (!newOrder[action.id]) return;
      if (newOrder[action.id] === 0) return;
      newOrder[action.id] = newOrder[action.id] - 1;
      return { ...state, order: newOrder };
    case "set-current-call": {
      return { ...state, currentCall: action.call };
    }
    case "save-settings": {
      const { name, phone, address, upi } = action;
      return {
        ...state,
        settings: {
          name,
          phone,
          address,
          upi,
        },
      };
    }
    case "load-settings": {
      return { ...state, settings: { ...action.settings } };
    }
    default:
      return state;
  }
}

const dummyHandler = () => {};

export const AppProvider = ({
  children,
  onOrderSubmitted = dummyHandler,
}) => {
  const [menu, setMenu] = useState({ name: "Catalog", items: [] });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [nav, setNav] = useState({ current: "catalog", previous: null });

  const [didLoadFromStorage, setDidLoadFromStorage] = useState(false);

  useEffect(() => {
    window.CasualSeller.db.getItem("seller_settings").then((settings) => {
      setDidLoadFromStorage(true);
      if (!settings) return;
      dispatch({
        type: "load-settings",
        settings,
      });
    })
  }, []);

  useEffect(() => {
    if (!didLoadFromStorage) return;
    window.CasualSeller.db.setItem(
      "seller_settings", state.settings
    )    
  }, [state]);

  function navigateTo(route) {
    let oldNav = nav;
    setNav({
      current: route,
      previous: oldNav,
    });
  }

  return (
    <AppContext.Provider
      value={{
        menu,
        onOrderSubmitted,
        route: nav.current,
        navigateTo,
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
