const router = require("express").Router();
const multer = require("multer");
const Tesseract = require("tesseract.js");
const auth = require("../middleware/auth");
const Document = require("../models/Document");
const { OpenAI } = require("openai");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// OCR Upload
router.post("/upload", auth, upload.single("file"), async (req, res) => {
  const result = await Tesseract.recognize(req.file.buffer, "eng");
  res.send({ text: result.data.text });
});

// Summary
router.post("/summary", auth, async (req, res) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: req.body.text }],
  });

  res.send({ summary: response.choices[0].message.content });
});

// Save Document
router.post("/save", auth, async (req, res) => {
  const doc = new Document({
    userId: req.user.id,
    text: req.body.text,
    summary: req.body.summary,
  });
  await doc.save();
  res.send(doc);
});

// Get History
router.get("/history", auth, async (req, res) => {
  const docs = await Document.find({ userId: req.user.id });
  res.send(docs);
});

module.exports = router;
