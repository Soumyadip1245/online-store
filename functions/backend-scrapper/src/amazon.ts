import { Info, Products, getHTML } from './util'
import cheerio from 'cheerio'
async function getUrl(searchWord: string) {
    return `https://www.amazon.in/s?k=${searchWord}&ref=nb_sb_noss`
}
export async function amazonData(searchWord: string):Promise<Info> {
    try {
        const product = await getUrl(searchWord)
        const html = await getHTML(product)
        const $ = cheerio.load(html);
        const data: Products[] = [];
        $('.s-card-container').each((i, el) => {
            const match = $(el).find('span.a-price-whole').text().replace(/[^\d.]/g, '').match(/^\d+/)
            const digits = match ? parseInt(match[0].replace(/,/g, "")) : null;
            const productData: Products = {
                name: $(el).find('h2').text(),
                price: digits,
                image: $(el).find('img.s-image').attr('src') || "No Image",
                title: "Amazon",
                rating: $(el).find('span.a-icon-alt').text()
            }
            data.push(productData)
        });
        return {data:data,status: 200}
    }
    catch (e:any) {
        return {data: e.message,status: 500}
    }
}