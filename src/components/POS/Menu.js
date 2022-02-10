// import React, { useContext } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
// import CommentIcon from "@material-ui/icons/Comment";
// import AddIcon from "@material-ui/icons/AddCircle";
// import RemoveIcon from "@material-ui/icons/RemoveCircle";
// import { AppContext } from './AppProvider';
// import { Tooltip } from "@material-ui/core";
import currency from 'currency.js'

import React, { useEffect, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import html2canvas from 'html2canvas';
import { POSContext } from './POSProvider';
import { AppContext } from '../AppProvider';
// import { AppContext } from '../providers/AppProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const printOrder = async () => {
  const canvas = await html2canvas(document.querySelector('#orderlist'));
  return canvas.toDataURL('image/png');
};

export default function CenteredGrid() {
  const classes = useStyles();
  const {onOrderSubmitted, settings} = useContext(AppContext)
  const { menu, order, dispatch } = useContext(POSContext);

  const [cursor, setCursor] = useState(menu);
  const cursorStack = useRef([]);

  useEffect(() => {
    if (!menu) return;
    setCursor(menu)
  }, [menu])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Grid container spacing={3}>
            {cursor.items.map((item, i) => {
              return (
                <Grid item xs={4} key={`cat-${i}`}>
                  <Button
                    variant="contained"
                    style={{ width: '100%', height: 80 }}
                    onClick={() => {
                      if (item.items) {
                        // Traverse
                        cursorStack.current.push(cursor);
                        setCursor(item);
                      } else {
                        // Variation is being added
                        // let len = cursorStack.current.length
                        // let lastNavItem = cursorStack.current[len - 1]
                        dispatch({
                          type: 'add-item',
                          id: item.id,
                          name: `${cursor.name} - ${item.name}`,
                          price: item.price,
                        });
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <div style={{ marginTop: 20, display: 'flex' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 5, width: '100%' }}
              onClick={() => {
                cursorStack.current = [];
                setCursor(menu);
              }}
            >
              Home
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ marginLeft: 5, width: '100%' }}
              onClick={() => {
                if (cursorStack.current.length < 1) return;
                let popped = cursorStack.current.pop();
                setCursor(popped);
              }}
            >
              Back
            </Button>
          </div>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" style={{padding: 10}}>
            {settings ? settings.name : ''}
          </Typography>
          <Typography style={{padding: 10}}>
            {'Order'}
          </Typography>
          <List className={classes.root} id={'orderlist'}>
            {Object.keys(order.lineItems).map((item, i) => {
              return (
                <ListItem key={`lineitem-${i}`} >
                  <ListItemText primary={order.lineItems[item].name} />
                  <ListItemText
                    style={{ textAlign: 'right' }}
                    primary={order.lineItems[item].qty}
                  />
                </ListItem>
              );
            })}
            <ListItem>
              {/* <ListItemText primary={order.lineItems[item].name} /> */}
              <ListItemText
                style={{ textAlign: 'right' }}
                primary={currency(order.total).format('₹0.00')}
              />
            </ListItem>
          </List>
          <div style={{ marginTop: 20, display: 'flex' }}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: 5, width: '100%' }}
              onClick={() => {
                printOrder().then((png) => {
                  onOrderSubmitted({
                    order,
                    img: {
                      mimeType: 'image/png',
                      data: png.replace('data:image/png;base64,', ''),
                    }
                  })
                });
              }}
            >
              Pay
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
