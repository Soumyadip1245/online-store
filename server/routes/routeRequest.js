const router = require('express').Router()
const axios = require('axios');
const cheerio = require('cheerio');

router.post("/fetchData", async (req, res) => {
    try {
        const result = await axios.get(`https://www.amazon.in/s?k=${req.body.keyword}`);
        const $ = cheerio.load(result.data);
        const data = [];
        $('.s-asin').each((i, el) => {
            const id = $(el).attr('data-asin');
            const brand = $(el).find('h5 .a-size-base-plus').text();
            const name = $(el).find('h2 span').text();  
            const price = $(el).find('.a-price-whole').text();
            const rating = $(el).find('.a-spacing-top-micro span').attr('aria-label');
            const image = $(el).find('.s-image').attr('src');
            const link = 'https://www.amazon.in' + $(el).find('.a-link-normal').attr('href');
            const productData = { id, brand, name, price, rating, image, link };
            data.push(productData);
        });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch data from Amazon." });
    }
});

module.exports = router;