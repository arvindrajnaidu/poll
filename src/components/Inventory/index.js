import React from "react";
import Inventory from "./Inventory";
import InventoryProvider from "./InventoryProvider";

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export default function (args) {
  return (
    <InventoryProvider>
      <Inventory {...args} />
    </InventoryProvider>
  );
}
