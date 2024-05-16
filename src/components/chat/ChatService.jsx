import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Message from '../../models/messages';
import { GetUser } from '../login/Auth';
import { useQuery } from 'react-query';
import Seller from '../../models/seller';
import Loader from '../../utils/loader/Loader';
import { getFirestore, collection, where, orderBy, query, onSnapshot } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { Input, Button, List, Avatar, Empty } from 'antd';
import './ChatService.css'
import { sendMail } from '../../utils/mail';
import VoiceRecognition from '../../utils/voice-recognition/VoiceRecognition';
import { speakMessage } from '../../utils/voice-recognition/Speak';
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
}, "main");

const db = getFirestore(app);

const ChatService = () => {
  const [typemessage, setMessage] = useState("");
  const [seller, setSeller] = useState(new Seller());
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const fetchData = async () => {
    return await GetUser(user);
  };

  const { data, isLoading } = useQuery("chat", fetchData, { enabled: !!user });

  useEffect(() => {
    if (data) {
      setSeller(data);
    }
  }, [data]);

  useEffect(() => {
    messageInitiated();
  }, [seller]);

  const sendMessage = async () => {
    const message = new Message();
    message.isStaff = false;
    message.sellerId = seller._id;
    message.text = typemessage;
    await message.create();
    setMessage("");
  };

  const messageInitiated = async () => {
    const message = window.location.origin + "/1245chat/" + seller._id
    console.log(message)
    const q = query(collection(db, "messages"),
      where("sellerId", "==", seller._id),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const objs = querySnapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
      const array = []

      objs.map(curr => {
        array.push(Message.toCls(curr))
      })
      setMessages(array);

    });
    console.log("Chat bot is activated");
  };
  const commands = [

    {
      command: "send message *",
      callback: (message) => {
        setMessage(message)
        speakMessage(`Your message is ${message}`);
      },
    },
    {
      command: "send message",
      callback: () => {
        sendMessage()
        speakMessage("Message sent")
      },
    },
    {
      command: "check latest",
      callback: () => {
        if (messages[messages.length - 1].isStaff) {
          speakMessage(`Staff latest message is: ${messages[messages.length - 1].text}`)
        }
        else {
          speakMessage("No message from staff yet")
        }
      },
    },


  ]
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>

      <VoiceRecognition commands={commands} />
      <section class="msger" >

        <>
          <main class="msger-chat" style={{ maxHeight: '200px', overflow: 'auto' }}>
            {messages.map((item, index) => (
              <div key={index} class={`msg ${item.isStaff ? 'left-msg' : 'right-msg'}`}>
                <div class="msg-bubble">
                  <div class="msg-text">{item.text}</div>
                </div>
              </div>
            ))}
          </main>

        </>


      </section>
      <div className="send-message">
      <input type="text"  value={typemessage}   onChange={(e) => setMessage(e.target.value)}className="input-field" placeholder='Type message' />
      <div className="message-btnn" onClick={sendMessage}>
      <i class="fa-solid fa-paper-plane"></i>
      </div>
      </div>
    </>
  );

}

export default ChatService;
