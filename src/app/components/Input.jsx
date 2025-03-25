import React from "react";

const Input = ({ input, setInput }) => {
  return (
    <input
      type="text"
      value={input}
      onChange={(event) => setInput(event.target.value)}
      className="bg-white w-[80%] mr-2 px-4 py-2 rounded ring-offset-0 focus-visible:ring-0 focus-visible:outline-none focus:outline-none focus:ring-0 ring-0 focus-visible:border-none focus-visible:ring-none"
      placeholder="Ask me anything..."
    />
  );
};

export default Input;
