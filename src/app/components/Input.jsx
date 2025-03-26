import React from "react";

const Input = ({ input, setInput }) => {
  return (
    <input
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      className="bg-white w-[80%] mr-2 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
      placeholder="Ask me anything..."
    />
  );
};

export default Input;
