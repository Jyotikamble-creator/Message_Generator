// import required modules

import React, { useState } from "react";
import MessageGenerator from "./components/MessageGenerator";

// react component
function App() {
  const [message, setMessage] = useState("");

//   sharing function
  const handleShare = async () => {

    try {
      if (!message) return;

      if (navigator.share) {
        await navigator.share({
          title: "Generated Message",
          text: message,
        });
        console.log("Message shared successfully!");
      } else {
        // fallback  copy to clipboard
        await navigator.clipboard.writeText(message);
        alert("Sharing not supported. Message copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert(" Failed to share message. Please try again.");
    }

  };

//   rendering all component
  return (
    <div className="p-4 rounded-xl shadow-md bg-white max-w-xl mx-auto">

      <h2 className="text-lg font-bold mb-2">📩 WhatsApp Message Composer</h2>
      <p className="mb-4">
        Type a prompt (like <em>"Diwali wish for John"</em>) and we’ll generate
        a message for you.
      </p>

      <MessageGenerator onMessageGenerated={setMessage} />

      <div style={{ marginTop: "20px" }}>

        {/* generated message */}
        <h4>Generated Message:</h4>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          cols={60}
          placeholder="Your generated message will appear here..."
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <div style={{ marginTop: "10px" }}>

            {/* shareing button */}
          <button
            onClick={handleShare}
            style={{
              padding: "8px 12px",
              border: "none",
              background: "#007bff",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Share Message
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;