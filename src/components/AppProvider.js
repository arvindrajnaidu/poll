import React, { useEffect, createContext, useState, useReducer } from "react";
import {v4 as uuid} from 'uuid'

export const AppContext = createContext({});

function PollInstance({ poll, groupId }) {
  let votes = poll.choices.reduce((acc, choice) => {
    acc[choice.id] = new Set()
    return acc
  }, {})

  return {
    id: uuid(),
    groupId,
    poll,
    votes,
  };
}

const initialState = { pollInstances: {} };

function reducer(state, action) {
  switch (action.type) {
    case 'load-state': {
      return { ...action.state };
    }
    case "vote": {
      const { from, selectedButtonId } = action.vote;
      const [pollInstanceId, choiceId] = selectedButtonId.split('.')
      const newPollInstance = {...state.pollInstances[pollInstanceId]}
      newPollInstance.votes[choiceId].add(from)
      const newPollInstances = {...state.pollInstances, [pollInstanceId]: newPollInstance}
      return {...state, pollInstances: newPollInstances};
    }
    case "create-pollinstance": {
      const { pollInstance } = action;
      const instances = {...state.pollInstances, [pollInstance.id]: pollInstance};
      return {...state, pollInstances: instances};
    }
    default:
      return state;
  }
}

const dummyHandler = function (){};
const dummyElement = {dispatchEvent: () => {}, addEventListener: () => {}}

export const AppProvider = ({
  children,
  EventConstructor = dummyHandler,
  element = dummyElement,
  keyValueStore,
}) => {
  const [didLoadFromStorage, setDidLoadFromStorage] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  function createPollInstance (poll) {
    const pollInstance = PollInstance({poll, groupId: 'group-1'})
    // Maintian inernal state
    dispatch({
      type: 'create-pollinstance',
      pollInstance
    })
    // Emit an event
    const event = new EventConstructor('poll-created', {
      detail: {pollInstance}
    })
    element.dispatchEvent(event)
  }

  // Add a listener on the element given to listen to CustomEvents
  useEffect(() => {
    element.addEventListener("vote", (e) => {
      dispatch({
        type: e.type,
        ...e.detail
      });
    });
  }, []);

  // Storage
  useEffect(() => {
    keyValueStore.getItem("poll_state").then((state) => {
      setDidLoadFromStorage(true);
      if (!state) return;
      dispatch({
        type: "load-state",
        state,
      });
    });
  }, []);

  useEffect(() => {
    if (!didLoadFromStorage) return;
    // console.log("Writing inventory");
    const { pollInstances } = state;
    const dbState = {
      pollInstances,
    };
    // Write to storage
    keyValueStore.setItem("poll_state", dbState);
  }, [state]);

  return (
    <AppContext.Provider
      value={{
        createPollInstance,
        keyValueStore,
        ...state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
