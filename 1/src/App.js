import React, { useState } from "react";
import { Message } from "./Components/Message/Message.jsx";
import { MessageList } from "./Components/MessageList/MessageList.jsx";
import { Form } from "./Components/Form/Form.jsx";

import "./App.css";
import { useEffect } from "react";
import { AUTHOR } from "./constans.js";

export const App = () => {
  const [messages, setMessages] = useState([]);

  const addMessages = (newMessages) => {
    setMessages([...messages, newMessages]);
  };

  useEffect(() => {
    if (
      messages.length > 0 &&
      messages[messages.length - 1].author === AUTHOR.user
    ) {
      setTimeout(() => {
        addMessages({
          author: AUTHOR.bot,
          text: "Iam Bot",
        });
      }, 1000);
    }
    console.log("test");
  }, [messages]);

  return (
    <div className="App">
      <Message text="Текст переданный через props" />
      <MessageList messages={messages} />
      <Form addMessage={addMessages} />
    </div>
  );
};
