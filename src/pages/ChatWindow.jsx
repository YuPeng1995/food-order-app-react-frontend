import React, { useState, useEffect } from "react";

const ChatWindow = ({ chatId }) => {
    // const [messages, setMessages] = useState([]);
    // const [newMessage, setNewMessage] = useState("");

    // // 模拟 WebSocket 或轮询获取消息
    // useEffect(() => {
    //     // Fetch chat history
    //     fetch(`/api/chat/${chatId}`)
    //         .then((res) => res.json())
    //         .then((data) => setMessages(data.messages));

    //     const socket = new WebSocket("ws://localhost:8080/chat");
    //     socket.onmessage = (event) => {
    //         const message = JSON.parse(event.data);
    //         if (message.chatId === chatId) {
    //             setMessages((prevMessages) => [...prevMessages, message]);
    //         }
    //     };

    //     return () => socket.close();
    // }, [chatId]);

    // // 发送消息
    // const sendMessage = () => {
    //     if (newMessage.trim()) {
    //         fetch(`/api/chat/${chatId}`, {
    //             method: "POST",
    //             body: JSON.stringify({ content: newMessage }),
    //             headers: { "Content-Type": "application/json" },
    //         });
    //         setNewMessage("");
    //     }
    // };

    // return (
    //     <div className="chat-window">
    //         <div className="messages">
    //             {messages.map((msg, index) => (
    //                 <div key={index} className={msg.sender === "me" ? "my-message" : "their-message"}>
    //                     {msg.content}
    //                 </div>
    //             ))}
    //         </div>
    //         <input
    //             type="text"
    //             value={newMessage}
    //             onChange={(e) => setNewMessage(e.target.value)}
    //             placeholder="Type a message..."
    //         />
    //         <button onClick={sendMessage}>Send</button>
    //     </div>
    // );
};

export default ChatWindow;
