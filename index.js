const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Define a simple response for the root URL
app.get('/', (req, res) => {
  res.send("Welcome to the Hydration AI API! Use /api/ask");
});

// ✅ Ensure the `/api/ask` route is properly set up
app.post('/api/ask', async (req, res) => {
    const userQuestion = req.body.question;
    
    if (!userQuestion) {
        return res.status(400).json({ error: "Question is required" });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "user", content: userQuestion }]
            })
        });

        const data = await response.json();
        res.json({ answer: data.choices && data.choices[0] ? data.choices[0].message.content : "No response from AI" });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch response from OpenAI" });
    }
});

// ✅ Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`AI Backend running on port ${PORT}`);
});