import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Button } from "@material-ui/core";

const replacer = (key, value) => (value instanceof Set ? [...value] : value);
const reviver = (key, value) => {
  if (key === "votes") {
    let retVal = Object.keys(value).reduce((acc, key) => {
      acc[key] = new Set(value[key]);
      return acc;
    }, {});
    return retVal;
  }
  return value;
};

const keyValueStore = {
  getItem: async function (key) {
    let val = window.localStorage.getItem(key);
    return val ? JSON.parse(val, reviver) : null;
  },
  setItem: async function (key, val) {
    return window.localStorage.setItem(key, JSON.stringify(val, replacer));
  },
};

var pollInstance;

document.getElementById("root").addEventListener("poll-created", (e) => {
  pollInstance = e.detail.pollInstance;
});

ReactDOM.render(
  <React.StrictMode>
    <App
      // onPollRequested={onPollRequested}
      EventConstructor={CustomEvent}
      element={document.getElementById("root")}
      keyValueStore={keyValueStore}
      // addPollListener={(f) => listeners.push(f)}
    />
    <Button
      onClick={() => {
        if (!pollInstance) return;
        const vote = {
          from: "arvind",
          type: "buttons_response",
          selectedButtonId: `${pollInstance.id}.${pollInstance.poll.choices[0].id}`,
        };
        const voteEvent = new CustomEvent("vote", {
          detail: { vote },
        });
        document.getElementById("root").dispatchEvent(voteEvent);
      }}
    >
      Vote
    </Button>
    <Button
      onClick={() => {
        if (!pollInstance) return;
        const vote = {
          from: "rachna",
          type: "buttons_response",
          selectedButtonId: `${pollInstance.id}.${pollInstance.poll.choices[1].id}`,
        };
        const voteEvent = new CustomEvent("vote", {
          detail: { vote },
        });
        document.getElementById("root").dispatchEvent(voteEvent);
      }}
    >
      Vote
    </Button>
    <Button
      onClick={() => {
        if (!pollInstance) return;
        const vote = {
          from: "nick",
          type: "buttons_response",
          selectedButtonId: `${pollInstance.id}.${pollInstance.poll.choices[1].id}`,
        };
        const voteEvent = new CustomEvent("vote", {
          detail: { vote },
        });
        document.getElementById("root").dispatchEvent(voteEvent);
      }}
    >
      Vote
    </Button>
  </React.StrictMode>,
  document.getElementById("root")
);
