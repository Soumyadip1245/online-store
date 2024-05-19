import { Client } from 'node-appwrite';
import { fetch } from 'undici';

import cheerio from 'cheerio';
// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  try {
    log("in")
    
    const result = await fetch('https://www.amazon.in/s?k=macbook');
    const value = await result.json()
    log(value)
    const $ = cheerio.load(value.data);
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
        log(productData)
    });
    log("Data")
    return res.json(data);
} catch (error) {
  log("catch")
    return res.json({ message: "Failed to fetch data from Amazon." });
}
};
