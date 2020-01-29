import React, { createContext, useReducer } from 'react';
import io from 'socket.io-client';

export const Ctx = createContext();

const initState = {
  general: [
    { from: 'Pals', msg: 'Hello' },
    { from: 'Shaurya', msg: 'Hello' },
    { from: 'Priya', msg: 'Hello' }
  ],
  books: [
    { from: 'Shaurya', msg: 'Hello' },
    { from: 'Saumi', msg: 'Hello' },
    { from: 'Pri', msg: 'Hello' }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case 'RECIEVE_MESSAGE':
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit('chat message', value);
}

export default function Store(props) {
  const user = 'user' + Math.floor(Math.random() * 100);

  const [allChats, dispatch] = useReducer(reducer, initState);
  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', function(msg) {
      dispatch({ type: 'RECIEVE_MESSAGE', payload: msg });
    });
  }

  return (
    <Ctx.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </Ctx.Provider>
  );
}
