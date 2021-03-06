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
import ProgressIndicator from './ProgressIndicator';
import { AppContext } from "../AppProvider";
import _ from 'underscore'

export default function ItemList() {
  const { items, choices, dispatch } =
    useContext(InventoryContext);
  const { polls,  createPollInstance } = useContext(AppContext)

  const [itemList, setItemList] = useState([]);
  // const classes = useStyles();

  useEffect(() => {
    if (!items) return;
    // console.log(items)
    let dbItems = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        choices: choices.filter((v) => v.itemId === item.id),
      };
    });
    // console.log(dbItems, "<<< Items");
    setItemList(dbItems);
  }, [items, choices]);

  return (
    <div>
      <div
        style={{textAlign: "right" }}
      >
        <Typography>
          {"All Polls"}
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
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", flexDirection: "column", width: '100%' }}>
                  <List style={{ flex: "100%"}}>
                    {il.choices.map((v) => {
                      // console.log(v.id, 'Is the choice id', polls[v.id])
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
                            {/* <Typography>{currency(v.price, {pattern: `??? #`}).format("0.00")}</Typography> */}
                          </div>
                          {/* <ProgressIndicator  choiceBucket={polls[v.id]} /> */}
                          {/* <ListItemSecondaryAction>
                            
                          </ListItemSecondaryAction> */}
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
                      {"Reset"}
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
                    <Button
                      // variant="contained"
                      color="primary"
                      onClick={() => {
                        createPollInstance(il)
                      }}
                    >
                      {"Ask"}
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
