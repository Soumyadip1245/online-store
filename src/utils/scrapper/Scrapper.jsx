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

            <h2 className='banner-header'>Want Some Suggestion Adding Products!!</h2>
            <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Product"
                onPressEnter={fetchRender}
                suffix={<Button onClick={fetchRender}>Send</Button>}
            />
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
            <Grid className='toolproduct' container spacing={2}>
                {items.map((curr, index) => (
                    <Grid item xs={3} key={index}>
                        <Card style={{ marginBottom: '20px', marginTop: '20px', boxShadow: 'box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;' }}>
                            <CardContent style={{ padding: 0 }}>
                                <div style={{ backgroundColor: '#fff', height: '200px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                                    <img src={curr.image} alt={curr.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                </div>
                                <CardContent style={{ padding: '20px' }}>
                                    <Typography variant="body1">{curr.name.length > 20 ? curr.name.substring(0, 20) + '....' : curr.name}</Typography>
                                    <Typography variant="body1">₹ {curr.price}</Typography>
                                    <Button variant="contained" color="primary" onClick={() => addProduct(curr)}>Add</Button>
                                    <div sx={{ display: 'flex' }}>
                                        <p style={{ margin: "1rem 0 5px 0", color: "black", fontSize: "10px" }}>Powered By</p>
                                        <img src={AmazonLogo} style={{ width: "28%" }} />
                                    </div>
                                </CardContent>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Scrapper;
