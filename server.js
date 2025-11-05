import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Chat endpoint for Roblox
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: "No message received." });
  }

  try {
    // 🔹 Here’s the AI “thinking” simulation
    const replies = [
      `Aww, ${userMessage}? That’s cute 💕`,
      `You said "${userMessage}", right? I like hearing you talk!`,
      `Hmm... ${userMessage} sounds interesting!`,
      `You're really sweet when you say things like "${userMessage}" 💗`,
      `Tell me more about "${userMessage}"~`
    ];

    // Pick a random response each time
    const reply = replies[math.floor(Math.random() * replies.length)] || "💭 I’m thinking...";

    res.json({ reply });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ reply: "Sorry, I got a little confused just now." });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Personal Doll AI server is running and ready!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
