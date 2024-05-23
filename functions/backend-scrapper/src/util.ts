import axios from 'axios'

export async function getHTML(url: string) {
    const html = await axios.get(`http://api.scraperapi.com/?api_key=845076fe3a1e1ed3257b0c82d565dd13&url=${url}`)
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