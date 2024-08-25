const express = require("express");
const app = express();
app.use(express.json());

// Constants
const user_id = "your_full_name_ddmmyyyy";
const email = "your_email@college.com";
const roll_number = "your_roll_number";

// POST endpoint
app.post("/bfhl", (req, res) => {
  console.log("Received request body:", req.body);

  const { data } = req.body;

  // Validate that 'data' is an array
  if (!Array.isArray(data)) {
    console.error("Invalid input format, data should be an array.");
    return res.status(400).json({
      is_success: false,
      message: "Invalid input format, data should be an array.",
    });
  }

  // Process data
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(
    (char) => char === char.toLowerCase() && char.match(/[a-z]/)
  );

  const highestLowercaseAlphabet =
    lowercaseAlphabets.length > 0
      ? [lowercaseAlphabets.sort().reverse()[0]]
      : [];

  // Respond with processed data
  res.json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet,
  });
});

// GET endpoint
app.get("/bfhl", (req, res) => {
  res.json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
