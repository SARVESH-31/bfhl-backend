const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());

// Use JSON middleware
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:8001',  // Replace with your frontend's URL
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
  };

app.use(cors(corsOptions));


app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "SARVESH KADAM_29112003";  // Update with your full name and DOB
    const email = "sarveshdadasaheb.kadam2021@vitstudent.ac.in";
    const roll_number = "21BCE1183";

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input format" });
    }

    let numbers = [];
    let alphabets = [];
    let highestLowercase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item)) {
                if (!highestLowercase || item > highestLowercase) {
                    highestLowercase = item;
                }
            }
        }
    });

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
