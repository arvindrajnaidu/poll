import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const variationGroups = [
    {
        name: "Yes / No/ Maybe",
        choices: [{ name: "Yes" }, { name: "No" }, { name: "Maybe" }],
    }, {
        name: "Agree / Disagree",
        choices: [{ name: "Agree" }, { name: "Disagree" }],
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
        Choice Sets
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
                  return <MenuItem key={`item-${i}`} onClick={() => handleClose(i)}>{vg.name}</MenuItem>
              })
          }
      </Menu>
    </div>
  );
}
