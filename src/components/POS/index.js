import React, { useContext } from "react";
import Menu from "./Menu";

import InventoryProvider from "../Inventory/InventoryProvider"
import POSProvider from "./POSProvider";

export default function POS() {

  return (
    <InventoryProvider>
      <POSProvider>
        <Menu />
      </POSProvider>
    </InventoryProvider>
  );
}
