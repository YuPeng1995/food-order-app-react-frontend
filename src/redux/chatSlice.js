import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],  // 聊天列表
        currentChat: null,  // 当前打开的会话
        messages: [],  // 当前会话消息
    },
    reducers: {
        setChats(state, action) {
            state.chats = action.payload;
        },
        setCurrentChat(state, action) {
            state.currentChat = action.payload;
        },
        addMessage(state, action) {
            state.messages.push(action.payload);
        },
    },
});

export const { setChats, setCurrentChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
