import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "facebook/blenderbot-400M-distill";
const HF_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(HF_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: message })
    });

    const data = await response.json();
    const reply =
      data[0]?.generated_text ||
      data.generated_text ||
      "I’m not sure what to say right now.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Sorry, I couldn’t connect right now." });
  }
});

app.listen(3000, () => console.log("✅ Personal Doll server running on port 3000"));
