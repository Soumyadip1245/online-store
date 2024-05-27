import { Info, Products } from './utils'
import axios from 'axios'
async function getData(searchWord: string) {
    const html = await axios.get(`https://api.scraperapi.com/structured/google/shopping?api_key=${process.env.TOKEN}&query=${searchWord}&country_code=in`)
    return html.data
}
export async function shoppingData(searchWord: string):Promise<Info> {
    try {
        const response = await getData(searchWord)
        const data: Products[] = []
        response.shopping_results.map((curr: any) => {
            const match = curr.price.replace("₹", "").match(/[0-9,]+/); 
            const digits = match ? parseInt(match[0].replace(/,/g, "")) : null;
            const productData: Products = {
                name: curr.title,
                price: digits,
                image: curr.thumbnail,
                title: curr.source,
                rating: curr.rating || "No Ratings"
            }
            data.push(productData)
        })
        return {data:data,status: 200}
    }
    catch (e:any) {
        return {data: e.message,status: 500}
    }
}