import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Message from '../../models/messages'
import { GetUser } from '../login/Auth'
import { useQuery } from 'react-query'
import Seller from '../../models/seller'
import Loader from '../../utils/loader/Loader'
import { getFirestore, collection, where, orderBy, query, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { initializeApp } from 'firebase/app'
import { Input, Button, List, Avatar, Empty, Card } from 'antd';
import { useParams } from 'react-router-dom'
const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
}, "main")
const db = getFirestore(app)
const ChatWith = () => {
    const [typemessage, setMessage] = useState("")
    const [messages, setMessages] = useState([])
   const {id} = useParams()
   
    const sendMessage = async () => {
        const message = new Message()
        message.isStaff = true
        message.sellerId = id
        message.text = typemessage
        await message.create()
        setMessage("")
    }
    const messageInitiated = async () => {
        const q = query(collection(db, "messages"), 
            where("sellerId", "==", id),
            orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const objs = querySnapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
            const array = []
            objs.map(curr => {
                array.push(Message.toCls(curr))
            })
            setMessages(array)
            console.log(array)
        });

    }
    const closeInitiated = async () => {
      messages.map(curr=>{
         deleteDoc(doc(db, "messages", curr._id));
      })
    }
   
    return (
      
      <Card
      headStyle={{ backgroundColor: '#bdbdbd47' }}
       title="Need Help"
       style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}
     >
      <section class="msger" >
        <Button onClick={messageInitiated}>Start</Button>
    
        {messages.length > 0 ? (
          <>
            <main class="msger-chat" style={{ maxHeight: '200px', overflow: 'auto' }}>
              {messages.map((item, index) => (
                <div key={index} class={`msg ${item.isStaff ? 'right-msg' : 'left-msg'}`}>
                  <div class="msg-bubble">
                    <div class="msg-text">{item.text}</div>
                  </div>
                </div>
              ))}
            </main>
            <Input
              value={typemessage}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              onPressEnter={sendMessage}
              suffix={<Button onClick={sendMessage}>Send</Button>}
            />
          </>
        ) : (
          <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Empty />
          </div>
        )}
      </section>
      <Button onClick={closeInitiated}>Close</Button>
    </Card>
    
    );

}

export default ChatWith