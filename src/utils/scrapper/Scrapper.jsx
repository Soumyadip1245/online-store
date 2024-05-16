import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import { AddIcCallOutlined } from '@mui/icons-material';
import axios from 'axios';
import { Button, Input } from 'antd';
import Product from '../../models/product';
import './Scrapper.css'
import AmazonLogo from '../../components/assests/amazonLogo.png'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
const ServerStatus = {
    NOT_CHECKED: 'not checked',
    CHECKING: 'checking',
    NO_DATA: 'no data',
    DATA_FOUND: 'data found',
};
const Scrapper = ({ sendProduct }) => {
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [toolVisible, setToolVisible] = useState(false); // State to control the visibility of the .tool class elements

    const [serverStatus, setServerStatus] = useState({
        localhost: ServerStatus.NOT_CHECKED,
        vercel: ServerStatus.NOT_CHECKED,
        render: ServerStatus.NOT_CHECKED,
    });
    const addProduct = async (item) => {
        sendProduct(item)
    }
    const [servers, setServers] = useState([
        { name: 'localhost', url: 'http://localhost:5500', status: ServerStatus.NOT_CHECKED },
        { name: 'vercel', url: process.env.REACT_APP_VERCEL_URL, status: ServerStatus.NOT_CHECKED },
        { name: 'render', url: process.env.REACT_APP_RENDER_URL, status: ServerStatus.NOT_CHECKED },

    ]);
    useEffect(() => {
        if (toolVisible) {
            const toolElement = document.querySelector('.tool');
            if (toolElement) {
                toolElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [toolVisible]);

    const fetchRender = async () => {
        setToolVisible(true); // Show the .tool class elements

        // 1. .tool class load
        // 2. Scroll

        // 3. Below code will run
        const payload = { keyword: search };
        for (const server of servers) {
            await new Promise(resolve => setTimeout(resolve, 1500));


            try {
                setServers(prevServers => prevServers.map(srv => srv.name === server.name ? { ...srv, status: ServerStatus.CHECKING } : srv));
                console.log(`Request is sent to ${server.name.toUpperCase()}: ${server.url}/v1/fetchData`);
                const response = await Promise.race([
                    axios.post(`${server.url}/v1/fetchData`, payload),
                    new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 10000))
                ]);

                if (response.data && response.data.length > 0) {
                    setServers(prevServers => prevServers.map(srv => srv.name === server.name ? { ...srv, status: ServerStatus.DATA_FOUND } : srv));
                    setItems(response.data);
                    await new Promise(resolve => setTimeout(resolve, 500));

                    // Hide the .tool class elements as soon as data is found
                    // 4. 2 sec of hold
                    // 5. .tool class should hide
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setToolVisible(false);
                    setServers(servers.map(server => ({ ...server, status: ServerStatus.NOT_CHECKED })));



                    return; // Stop the loop as we got the data
                } else {
                    setServers(prevServers => prevServers.map(srv => srv.name === server.name ? { ...srv, status: ServerStatus.NO_DATA } : srv));
                    await new Promise(resolve => setTimeout(resolve, 500));

                    console.log(`No data from ${server.name}`);


                }
            } catch (error) {
                setServers(prevServers => prevServers.map(srv => srv.name === server.name ? { ...srv, status: ServerStatus.NO_DATA } : srv));
                await new Promise(resolve => setTimeout(resolve, 500));

                console.error(`Request to ${server.name} failed or timed out:`, error);


            }

        }

        console.log('All servers have been checked, and no data was found.');
        setServers(servers.map(server => ({ ...server, status: ServerStatus.NOT_CHECKED })));

        // await new Promise(resolve => setTimeout(resolve, 1000));
        setToolVisible(false); // Hide the tool class elements after all checks

    };

    const ServerIcon = ({ status }) => {
        switch (status) {
            case ServerStatus.CHECKING:
                return <i class="fa-regular fa-circle toollogo"></i>
            case ServerStatus.DATA_FOUND:
                return <i class="fa-solid fa-circle-check toolcheck"></i>
            case ServerStatus.NO_DATA:
                return <i class="fas fa-times-circle toolerror"></i>
            default:
                return <i class="fa-solid fa-circle-minus tooldefault"></i>
        }
    };
    const ServerText = ({ status }) => {
        switch (status) {
            case ServerStatus.CHECKING:
                return <h2>Checking</h2>
            case ServerStatus.DATA_FOUND:
                return <h2>Data Found</h2>
            case ServerStatus.NO_DATA:
                return <h2>Error Occured</h2>
            default:
                return <h2>Not Started</h2>
        }
    };

    return (
        <>
            <div className="storedetails-container">
                <div className='card-design'>
                    <p className='store-name'>Instant Products</p>
                    <div className='input-text'>
                        <input
                            type="text"
                            placeholder='enter your product name'
                            className='input-field'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <p className="written text-wrap">Search for the product name through our providers. If found, view the product details and add it directly to your inventory.</p>
                    </div>
                    <div>
                        <button className="btn-design" onClick={fetchRender}>Search</button>
                    </div>
                    {toolVisible && (
                        <div className="tool">
                            {servers.map(server => (

                                <div className="toolmain">
                                    <div className="toolservice toolchecking">
                                        <ServerIcon status={server.status} />
                                        <div className="toolservice-text">
                                            <h1>{server.name.charAt(0).toUpperCase() + server.name.slice(1)}</h1>
                                            <ServerText status={server.status} />
                                        </div>
                                    </div>
                                </div>


                            ))}
                        </div>
                    )}
                    <div className="scrapper-product">
                        {items.map((curr, index) => (
                            <div className="show-card">
                                <div className="show-flex">
                                    <div className="show-price">
                                        <div>
                                            <p className='showname'>{curr.name.length > 20 ? curr.name.substring(0, 20) + '....' : curr.name}</p>
                                                <img src={AmazonLogo} style={{ width: "15%", marginTop: '1rem' }} />
                                        </div>
                                        <p className='showprice'>₹ {curr.price}</p>
                                    </div>
                                    <div className="show-image">
                                        <div className="showimage">
                                            <img src={curr.image} alt="" />
                                        </div>
                                        <button className="btn-design" onClick={() => addProduct(curr)} >Add</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default Scrapper;
