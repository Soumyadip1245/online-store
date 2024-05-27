import { Info, Products, getHTML } from './utils'
import cheerio from 'cheerio'

export async function blinkitData(searchWord: string):Promise<Info> {

    try {
        const html = await getHTML(`https://blinkit.com/s/?q=${searchWord}`)
        const $ = cheerio.load(html);
        const data: Products[] = [];
        $('.fzUkAK').each((i, el) => {
            const regex = /₹\d+/g;
            const prices = $(el).find('.ljxcbQ div div').text().match(regex);
            const match = prices![0].replace("₹", "").match(/[0-9,]+/); 
            const digits = match ? parseInt(match[0].replace(/,/g, "")) : null;
            const productData: Products = {
                name: $(el).find('.hxWnoO').text(),
                price: digits,
                image: null,
                title: $(el).find('.plp-product__quantity--box').text(),
                rating: $(el).find('.eajROp').text()
            }
            data.push(productData)
        });
        return {data: data,status: 200}
    }
    catch (e:any) {
        return {data: e.message,status: 500}
    }
}