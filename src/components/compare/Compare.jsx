import React, { useEffect, useState } from 'react'
import './Compare.css'
import AmazonLogo from '../assests/amazonLogo.png'
import ShoppingLogo from '../assests/shopping.png'
import MyntraLogo from '../assests/myntra.png'
import BlinkitLogo from '../assests/blinkit.png'
import axios from 'axios'
import NotFound from '../assests/notfound.png'
import Product from '../../models/product'
import Seller from '../../models/seller'
import { GetUser } from "../login/Auth";
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import Store from '../../models/store'
import VoiceRecognition from '../../utils/voice-recognition/VoiceRecognition'
import { speakMessage } from '../../utils/voice-recognition/Speak';
const services = [
    { id: 1, name: 'Amazon', logo: AmazonLogo, code: 1 },
    { id: 2, name: 'Shopping', logo: ShoppingLogo, code: 2 },
    { id: 3, name: 'Myntra', logo: MyntraLogo, code: 3 },
    { id: 4, name: 'Blinkit', logo: BlinkitLogo, code: 4 },
];
const Compare = () => {
    const [seller, setSeller] = useState(new Seller());
    const [fetcher, setFetcher] = useState(-1)
    const [text, setText] = useState("Get data from the above sources")
    const [load, setLoad] = useState(-1)
    const [search, setSearch] = useState("")
    const [product, setProducts] = useState([])
    const [oproduct, setoProducts] = useState(new Product())
    const [store, setStore] = useState(new Store())
    const handleInputChange = (code) => {
        console.log(code)
        setFetcher(code);
    };
    const fetchQuery = async () => {
        setLoad(1);
        if (fetcher === -1) {
            return;
        }
        setText("Hitting our server for your query");

        try {
            const response = await axios.post("/fetchData", {
                fetcher: fetcher,
                query: search
            });

            if (response.status === 200) {
                setLoad(2);
                setProducts(response.data.data)
                setText(`Found ${response.data.data.length} products. You can add it directly to your stores`);
            } else {
                setLoad(4);
                setText(response.data);
            }
        } catch (error) {
            setLoad(4);
            setText("Error fetching data. Please try again later.");
        }
    };
    const addProduct = async (data) => {
        const storedata = await store.getStoreBySeller(seller._id)
        try {
            oproduct.productName = data.name
            oproduct.productCategory = data.title
            oproduct.productPrice = parseInt(data.price)
            oproduct.sellerId = seller._id
            oproduct.productImage = data.image
            oproduct.storeId = storedata._id
            await oproduct.create()
        }
        catch (e) {
            console.log(e.message)
        }
    }
    const user = useSelector((state) => state.auth.user);

    const fetchData = async () => {
        return await GetUser(user);
    };
    const { data, isLoading } = useQuery("profile", fetchData, { enabled: !!user })

    useEffect(() => {
        if (data) setSeller(data)
    }, [data])

    const commands = [];
    return (
        <>
            <VoiceRecognition commands={commands} />
            <div className="compare-container">
                <div className="card-design">
                    <p className="store-name">Explore Products</p>
                    <p className="written text-wrap">Explore 1000s of products from the below services.</p>
                    <div className="services-container">
                        {services.map((service) => (
                            <a onClick={() => handleInputChange(service.code)}>
                                <div className="services-info" key={service.id}>
                                    <img src={service.logo} alt={service.name} />
                                    <p className="written text-wrap">{service.name}</p>
                                    {fetcher === service.code && (
                                        <i className="fa-solid fa-circle-check icontool" ></i>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                    <input type="text" className="input-field" placeholder='Search products' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <div style={{ marginTop: '1rem' }}>
                        <button className="btn-design" onClick={fetchQuery}>Search</button>
                    </div>
                </div>
                <div className="card-design flex-design">
                    <div className="backend-container">
                        {load == 1 && <div className="backend-containeri">
                            <div className="backend-loader"></div>
                            <div className="backend-loader delay1"></div>
                            <div className="backend-loader delay2"></div>
                            <div className="backend-loader delay4"></div>
                        </div>}
                        {load == 2}
                        {load == 2 && <i className="fa-solid fa-circle-check icontool1" ></i>}
                        {load == 4 && <i className="fa-solid fa-circle-xmark iconreject" ></i>}
                    </div>
                    <p className="written" >{text}</p>

                </div>
                {load == 2 && <div className="card-design">
                    <div className='compare-container1'>
                        {
                            product.map(curr => (
                                <div className="show-card compare-product">
                                    <div className="show-flex">
                                        <div className="show-price">
                                            <div>
                                                <p className='showname'>{curr.name}</p>
                                                <p className='showcategory'>{curr.title}</p>
                                            </div>
                                            <p className='showprice'>₹ {curr.price}</p>
                                        </div>
                                        <div className="show-image">
                                            <div className="showimage">
                                                <img src={curr.image || NotFound} alt="" />
                                            </div>
                                            <button className="btn-design" onClick={() => addProduct(curr)}>Add to Store</button>

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>}
            </div>
        </>
    )
}

export default Compare