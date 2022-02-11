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
  const { pollInstances, onPollRequested } = useContext(AppContext)

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
          {"Current Polls"}
        </Typography>
      </div>
      <div style={{ marginTop: 20 }}>
        {_.values(pollInstances).map((pollInstance, key) => {
          return (
            <Accordion key={key}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id={key} style={{display: 'flex', marginLeft: 8, marginRight: 8}}>
                <div
                  style={{
                    display: "flex",
                    // backgroundColor: "red",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div style={{ flex: 2 }}>
                    <Typography>{pollInstance.poll.name}</Typography>
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{ display: "flex", flexDirection: "column", width: '100%' }}>
                  <List style={{ flex: "100%"}}>
                    {pollInstance.poll.choices.map((choice) => {
                      // console.log(v.id, 'Is the choice id', polls[v.id])
                      let voteCount = 0
                      _.values(pollInstance.votes).forEach(set => voteCount = voteCount + set.size)

                      console.log(voteCount, '<< Vote Count')
                      let bucket = pollInstance.votes[choice.id]  
                      const progress = voteCount ? (bucket.size / voteCount) * 100 : 0

                      // console.log(choice, bucket)
                      // const choiceName = pollInstance.poll[bucket.id]
                      return (
                        <ListItem button key={choice.id}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              marginRight: 100,     
                            }}
                          >
                            <Typography>{choice.name}</Typography>
                            {/* <Typography>{currency(v.price, {pattern: `₹ #`}).format("0.00")}</Typography> */}
                          </div>
                          <ProgressIndicator  progress={progress} />
                          {/* <ListItemSecondaryAction>
                            
                          </ListItemSecondaryAction> */}
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}
