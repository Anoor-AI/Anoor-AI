const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/', async (req, res) => {
  const question = req.body.question;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an AI hydration assistant, providing brief, helpful hydration-related answers." },
        { role: "user", content: question }
      ]
    });
    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI response failed." });
  }
});

module.exports = router;