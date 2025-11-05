import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Personal Doll AI server is running!");
});

app.post("/chat", async (req, res) => {
  const message = req.body.message || "";
  console.log("Received message:", message);
  res.json({ reply: `You said: ${message}` });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
