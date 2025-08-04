// routes/translate.route.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { q, source, target } = req.body;

  try {
    const response = await axios.post('https://translate.astian.org/translate', {
      q,
      source,
      target,
      format: "text"
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json({ translatedText: response.data.translatedText });
  } catch (error) {
    console.error("Translation proxy error:", error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

export default router;
