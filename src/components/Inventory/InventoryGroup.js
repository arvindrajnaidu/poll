import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const variationGroups = [
    {
        name: "Cut",
        variations: [{ name: "Small peices" }, { name: "Medium peices" }, { name: "Big Peices" }],
    }, {
        name: "Quantity in KG",
        variations: [{ name: "250g" }, { name: "500g" }, { name: "750g" }, { name: "1kg" },{ name: "1.5kg" }],
    }, {
        name: "Spice Level",
        variations: [{ name: "Hot" }, { name: "Medium" }, { name: "Mild" }],
    },
]

export default function InventoryGroup({onGroupSelected}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (vgIndex) => {
    setAnchorEl(null);

    onGroupSelected(variationGroups[vgIndex])
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Inventory Group
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {
              variationGroups.map((vg, i) => {
                  return <MenuItem onClick={() => handleClose(i)}>{vg.name}</MenuItem>
              })
          }
      </Menu>
    </div>
  );
}
