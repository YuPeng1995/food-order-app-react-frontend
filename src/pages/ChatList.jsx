import { Link } from "react-router-dom";

export default function ChatList({ chats }) {
    return (
        <>
            {/* <div className="chat-list">
                {chats.map((chat) => (
                    <Link key={chat.id} to={`/chat/${chat.id}`} className="chat-item">
                        <div>
                            <h4>{chat.participantName}</h4>
                            <p>{chat.lastMessage}</p>
                        </div>
                        <span>{chat.timestamp}</span>
                    </Link>
                ))}
            </div> */}
        </>
    );
}