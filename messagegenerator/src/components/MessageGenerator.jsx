// import required modules

import React, { useState } from "react";

// define the MessageGenerator component
const MessageGenerator = ({ onMessageGenerated }) => {
  const [prompt, setPrompt] = useState("");

  // genration of message
  const handleGeneration = () => {
    let generation = "";

    try {
      //  Extract name from prompt
      let match = prompt.match(/to\s+(\w+)/i);
      let extractedName = "";

      if (match) {
        extractedName = match[1];
      } else {
        match = prompt.match(/for\s+(\w+)/i);
        if (match) {
          extractedName = match[1];
        } else {
          // fallback  last word if name not found
          const words = prompt.split(/[\s,]+/);
          extractedName = words[words.length - 1];
        }
      }

      // final fallback if name is still empty
      extractedName = extractedName || "{name}";

      //  Check for predefined prompts
      if (prompt.toLowerCase().includes("diwali")) {
        generation = `Hello ${extractedName}, Diwali greetings! We wish you the best holiday. Namaste!`;
      }
      else if (prompt.toLowerCase().includes("new year")) {
        generation = `Hello ${extractedName}, Happy New Year! Wishing you joy, success, and prosperity.`;
      }
      else {
        // default custom message
        generation = `Hello ${extractedName},  ${prompt}`;
      }

      onMessageGenerated(generation);
    } catch (error) {
      console.error("Generation of message failed:", error);
      onMessageGenerated(" Error generating message. Please try again.");
    }
  };

  // input field and generate message button
  return (
    <div style={{ margin: "1rem 0" }}>

      {/* input field for prompt */}
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Enter a prompt (e.g., "Diwali wish for John")'
        style={{
          padding: "8px",
          width: "60%",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      {/* generate message button */}
      <button
        onClick={handleGeneration}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          border: "none",
          background: "#25D366",
          color: "white",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Generate Message
      </button>

    </div>
  );
};

export default MessageGenerator;
