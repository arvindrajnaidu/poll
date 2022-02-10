import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InventoryContext } from "./InventoryProvider";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import currency from "currency.js";
import { ListItemSecondaryAction, Switch } from "@material-ui/core";

export default function ItemList() {
  const { categories, items, variations, dispatch } =
    useContext(InventoryContext);

  const [itemList, setItemList] = useState([]);
  // const classes = useStyles();

  useEffect(() => {
    if (!items) return;
    // console.log(items)
    let dbItems = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        catId: item.catId,
        categoryName: categories.find((c) => c.id === item.catId).name,
        variations: variations.filter((v) => v.itemId === item.id),
      };
    });
    console.log(dbItems, "<<< Items");
    setItemList(dbItems);
  }, [categories, items, variations]);

  return (
    <div>
      <div
        style={{textAlign: "right" }}
      >
        <Typography>
          {"Item List"}
        </Typography>
      </div>
      <div style={{ marginTop: 20 }}>
        {itemList.map((il) => {
          return (
            <Accordion key={il.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id={il.id} style={{display: 'flex', marginLeft: 8, marginRight: 8}}>
                <div
                  style={{
                    display: "flex",
                    // backgroundColor: "red",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: 2 }}>
                    <Typography>{il.name}</Typography>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Typography>{il.categoryName}</Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", flexDirection: "column", width: '100%' }}>
                  <List style={{ flex: "100%"}}>
                    {il.variations.map((v) => {
                      return (
                        <ListItem button key={v.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              marginRight: 100,     
                            }}
                          >
                            <Typography>{v.name}</Typography>
                            <Typography>{currency(v.price, {pattern: `₹ #`}).format("0.00")}</Typography>
                          </div>

                          <ListItemSecondaryAction>
                            <Switch
                              checked={!!v.isAvailable}
                              onChange={(e) => {
                                dispatch({
                                  type: "update_variation",
                                  id: v.id,
                                  isAvailable: e.target.checked,
                                });
                              }}
                              name="isAvailable"
                              // inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                  <div
                    style={{
                      display: "flex",
                      margin: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      color={"secondary"}
                      onClick={() => {
                        dispatch({
                          type: "delete_item",
                          id: il.id,
                        });
                      }}
                    >
                      {"Delete"}
                    </Button>
                    <Button
                      onClick={() => {
                        dispatch({
                          type: "set_selected_item",
                          id: il.id,
                        });
                      }}
                    >
                      {"Edit"}
                    </Button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
