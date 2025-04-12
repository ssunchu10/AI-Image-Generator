const axios = require('axios');
const https = require('https');
const { v4: uuidv4 } = require('uuid');

const searchImages = async(req, res) => {
    try {
        const { prompt } = req.body;
        
        if(!prompt) {
            return res.status(400).json({
                success: false,
                error: 'Prompt is required'
            });
        }

        console.log(`Searching images for prompt: "${prompt}"`);
        
        const API_URL = 'https://bf.dallemini.ai/generate';
        
        const httpsAgent = new https.Agent({ 
            rejectUnauthorized: false,  
        });
        
        const response = await axios.post(API_URL, {
            prompt: prompt
        }, {
            httpsAgent,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Origin': 'https://hf.space',
                'Referer': 'https://hf.space/',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'X-Requested-With': uuidv4()
            },
            timeout: 100000 
        });

        if (response.data && response.data.images) {
            const singleImage = response.data.images[0];
            return res.status(200).json({
                success: true,
                images: [singleImage],
                total: 1
            });
        } else {
            return res.status(400).json({
                success: false,
                error: 'No images returned from the API'
            });
        }
    } catch(error) {
        if(error.response) {
            console.log(`Error status: ${error.response.status}`);
            console.log('Error data:', error.response.data);
        } else {
            console.log(`Error message: ${error.message}`);
        }

        res.status(500).json({
            success: false,
            error: 'The image search could not be completed'
        });
    }
}

module.exports = { searchImages };