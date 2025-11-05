import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 10000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// ✅ Main AI route
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a friendly AI doll that talks affectionately to your owner in simple sentences." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenAI reply:", data);

    // ✅ Make sure we always send a clean 'reply' field
    const reply = data?.choices?.[0]?.message?.content || "I'm not sure what to say right now.";
    res.json({ reply });
  } catch (err) {
    console.error("Error talking to OpenAI:", err);
    res.status(500).json({ reply: "I can't think right now..." });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
