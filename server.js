import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  // Make sure a message was sent
  if (!message) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    // Send message to OpenAI
    const reply = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await reply.json();

    // Respond back to Roblox
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error getting reply from AI" });
  }
});

app.listen(10000, () => console.log("✅ Server running on port 10000"));
