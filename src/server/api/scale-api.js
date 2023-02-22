const dotenv = require("dotenv");
const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const cors = require('cors');
const app = express();
app.use(cors());

dotenv.config();

// Set up OpenAI API configuration
const openaiConfig = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Read API key from environment variable
});

// Initialize OpenAI API client
async function init() {
    const openai = new OpenAIApi(openaiConfig);
    return openai;
}

// Create endpoint to scale weights and measures
app.get("/scaleWeightsAndMeasures", async (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

    const fromUnit = req.query.fromUnit;
    const quantity = req.query.quantity;
    const toUnit = req.query.toUnit || fromUnit;
    const scaleFactor = req.query.scaleFactor || 1;

    // Log input parameters to console
    console.log(`fromUnit: ${fromUnit}`);
    console.log(`quantity: ${quantity}`);
    console.log(`toUnit: ${toUnit}`);
    console.log(`scaleFactor: ${scaleFactor}`);

    // Create input prompt for OpenAI
    const prompt = `Scale multiply with a scale factor of ${scaleFactor} and convert ${quantity} ${fromUnit} to ${toUnit} `;

    // Generate text output using OpenAI
    try {
        const openai = await init();
        await openai
            .createCompletion({
                model: "text-davinci-003",
                prompt: generateQuestion(prompt),
                temperature: 0.0,
            })
            .then((completion) => {
                const scaledValue = completion?.data?.choices[0]?.text?.trim();
                console.log(`scaledValue: ${scaledValue}`);
                res.json({ scaledValue });
            })
            .catch((err) => console.error(err));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to generate text output" });
    }
});

// The CSV data table given below used for training comes from:
// https://en.wikipedia.org/wiki/Imperial_units
function generateQuestion(question) {
    return `Read the CSV data given below and answer the question ${question}.

Unit,Imperial ounces,Imperial pints,Millilitres,Cubic inches,US ounces,US pints
fluid ounce (fl oz),1 ,1/20 ,28.4130625 ,1.7339 ,0.96076 ,0.060047
gill (gi),5 ,1/4 ,142.0653125 ,8.6694 ,4.8038 ,0.30024
pint (pt),20 ,1 ,568.26125 ,34.677 ,19.215 ,1.2009
quart (qt),40 ,2 ,1136.5225 ,69.355 ,38.43 ,2.4019
gallon (gal),160 ,8 ,4546.09 ,277.42 ,153.72 ,9.6076

`;
}

// Start server
app.listen(4000, () => {
    console.log("Server listening on port 4000");
});
