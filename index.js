const express = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');

const port = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/openai', require('./routes/openAiRoutes'));

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})