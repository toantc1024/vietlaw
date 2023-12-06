import React, { Fragment, useEffect, useRef, useState } from "react";
import { HiPaperAirplane, HiSparkles, HiUser } from "react-icons/hi";
import { useChatbotStore, useUserStore } from "../../app/store";
import { USER_RESPONSE, BOT_RESPONSE } from "../../app/constants";

const Chatbot = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  // const { history, setHistory } = useChatbotStore();
  const [history, setHistory] = useState([]);
  const { user } = useUserStore();
  const formatMessage = (text, role) => {
    return {
      message: text,
      role: role,
    };
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);
  const [isTyping, setIsTyping] = useState(false);

  const renderMessage = (message, isTemp = false) => {
    return (
      <div>
        <div
          className={`w-full flex justify-start fade-in ${
            message.role === USER_RESPONSE ? "flex-row-reverse" : ""
          } gap-2`}
        >
          {/* Placeholder */}
          {message.role === USER_RESPONSE ? (
            <Fragment>
              <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-white">
                <HiUser />
              </div>
              <div className="p-4 bg-white rounded-lg max-w-4xl">
                {message.message}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-blue-400 text-white">
                <HiSparkles />
              </div>
              <div className="p-4 bg-blue-400 text-white rounded-lg max-w-4xl">
                {isTemp ? (
                  <span className="font-extrabold animation-pulse">...</span>
                ) : (
                  <span>{message.message}</span>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    );
  };

  const sendRequest = async () => {
    let textValue = text;
    let newHistory = history;
    setIsTyping(true);
    newHistory = [...history, { message: textValue, role: USER_RESPONSE }];
    setHistory(newHistory);
    setText("");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/chatbot`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ text: textValue }),
        method: "POST",
      }
    );
    // newHistory = history;
    setIsTyping(false);
    const data = await response.json();
    setHistory([...newHistory, { message: data.result, role: BOT_RESPONSE }]);
  };
  return (
    <div className="h-full w-full flex flex-col items-center justify-center px-4 gap-4 bg-white">
      <div className="rounded-lg bg-slate-100  overflow-auto flex flex-col w-full h-[calc(100vh-50px)] md:h-[550px] gap-2  p-2">
        {history && history.map((message) => renderMessage(message))}
        {isTyping &&
          renderMessage({ role: BOT_RESPONSE, message: "...." }, true)}
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-slate-100 w-full flex  gap-2  rounded-lg py-2">
        <textarea
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              sendRequest();
            }
          }}
          className="px-4 py-2 w-full bg-transparent focus:outline-none font-light"
          placeholder="Hãy hỏi VieLawyer một câu về pháp luật"
          type="text"
          value={text}
          onChange={(e) => {
            const value = e.target.value;
            setText(value);
          }}
        />
        <button
          onClick={() => sendRequest()}
          className="p-4 hover:text-gray-700  flex items-center justify-center"
        >
          <HiPaperAirplane className="rotate-[90deg]" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
