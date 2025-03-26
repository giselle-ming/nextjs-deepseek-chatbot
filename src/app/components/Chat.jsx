"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import Input from "./Input";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      setLoading(true);
      const response = await fetch("/api/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      let data;
      try {
        data = await response.json();
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        throw new Error("Invalid response from server");
      }

      if (response.ok) {
        const assistantMessage = { role: "assistant", content: data.answer };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          role: "assistant",
          content: data.error || "Something went wrong.",
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "An error occurred. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="fixed inset-x-0 bottom-10 px-7">
        <div className="md:max-w-xl md:mx-auto">
          <div className="mb-4 md:mt-2 pt-4">
            <div className="bg-white p-4 rounded-lg h-[85vh] overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-2 ${
                    message.role === "user"
                      ? "text-right text-gray-600 ml-5"
                      : "text-left text-[#414248] mr-10"
                  }`}
                >
                  <img
                    src={"/ai.png"}
                    className={
                      message.role === "user"
                        ? "hidden"
                        : "w-8 h-8 inline-block mr-2"
                    }
                    alt=""
                  />
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ))}
              {loading && <div className="text-gray-500">Thinking...</div>}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="items-center">
              <Input input={input} setInput={setInput} />
              <button
                type="submit"
                className="bg-gray-600 text-white md:px-2 py-2 rounded-lg disabled:opacity-50 w-[16%] md:w-[18%]"
                disabled={loading}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
