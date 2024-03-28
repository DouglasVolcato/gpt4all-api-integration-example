import bodyParser from "body-parser";
import express from "express";
import openai from "openai";
import cors from "cors";

const app = new express();
app.use(bodyParser.json());
app.use(cors());

app.post("/ask", async (req, res) => {
  try {
    const OpenAI = new openai({
      baseURL: "http://localhost:4891/v1",
      apiKey: "",
    });
    const response = await OpenAI.chat.completions.create({
      model: "Hermes-2-Pro-Mistral-7B.Q4_0.gguf".replace([".gguf", ".bin"]),
      messages: [{ role: "user", content: req.body.question }],
    });

    res.json({ answer: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
