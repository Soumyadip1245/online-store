import axios from 'axios'

export async function getHTML(url: string) {
    const html = await axios.get(`http://api.scraperapi.com/?api_key=${process.env.TOKEN}&url=${url}`)
    return html.data
}
export interface Products {
    name: string | null,
    price: number | null,
    image: string | null,
    title: string | null,
    rating: string | null
}
export interface Info{
    data: any,
    status: number
}
