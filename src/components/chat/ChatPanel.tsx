import { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import Image from 'next/image';
import { IoIosArrowBack } from 'react-icons/io';
import { useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Socket } from 'socket.io-client';
import ChatMessage from './ChatMessage';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// Register the plugin
import { FaUserAlt } from 'react-icons/fa';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Message {
    id: string;
    msg: string;
    senderId: string;
    createdAt: string;
    updatedAt: string;
}

interface ChatPanelProps {
    setroomid: Function;
    sessionId: string;
    handleSendMessage: (
        sessionId: string,
        message: string,
        socket: Socket
    ) => void;
    socket: Socket | null;
    messageList: Message[] | string[];
    chatData: { imageUrl: string; name: string };
    handleGetHistory: (sessionId: string, socket: Socket) => void;
    historyMessage: any[];
    userId: string;
    readyChat: boolean;
}
export default function ChatPanel({
    setroomid,
    sessionId,
    handleSendMessage,
    socket,
    messageList,
    handleGetHistory,
    historyMessage,
    userId,
    readyChat,
    chatData,
}: ChatPanelProps) {
    const [styleState, setStyleState] = useState(true);
    const [reservationState] = useState<boolean>(styleState);
    const [message, setMessage] = useState('');
    // TODO: remove this
    const [image, setImage] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data: session } = useSession();

    const getBackgroundColor = () => {
        switch (reservationState) {
            case false:
                return 'bg-redrice-red';
            case true:
                return 'bg-redrice-green';
            default:
                return 'bg-gray-800';
        }
    };

    useEffect(() => {
        if (!socket) return;
        handleGetHistory(sessionId, socket);
    }, [sessionId, socket]);

    const sendMessage = () => {
        if (message == '' || !socket) {
            return;
        }
        setMessage('');
        handleSendMessage(sessionId, message, socket);
        handleMessageSend();
    };

    const [messages, setMessages] = useState([
        { text: 'Hello!', isSender: false },
        { text: 'Hi there!', isSender: true },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleMessageSend = () => {
        console.log('use handle message send');
        if (newMessage.trim() !== '') {
            setMessages([...messages, { text: newMessage, isSender: true }]);
            setNewMessage('');
        }
    };
    //
    console.log('userDetails :', userId);
    console.log('history : ', historyMessage);
    useEffect(() => {
        if (!socket) return;
        handleGetHistory(sessionId, socket);
    }, [socket, sessionId]);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            }
        };
        scrollToBottom();
    }, [historyMessage]);

    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="h-20 w-full border-b border-slate-300 flex p-1 px-3 items-center gap-4 tablet:gap-6">
                <IoIosArrowBack
                    className="text-3xl text-white bg-slate-500 p-1 rounded-full sm:hidden hover:bg-slate-300"
                    onClick={() => setroomid('')}
                ></IoIosArrowBack>
                {chatData.imageUrl ? (
                    <Image
                        src={chatData.imageUrl}
                        alt="Product Picture"
                        width={60}
                        height={60}
                        layout="fixed"
                        className="object-contain rounded-full flex items-center w-16 h-16"
                    />
                ) : (
                    <div className="m-5 relative rounded-full bg-stone-200 border-4 border-black hover:border-redrice-yellow p-2 text-2xl hover:text-redrice-yellow">
                        <FaUserAlt color="grey" />
                    </div>
                )}

                <h1 className="text-md sm:text-2xl semi-bold line-clamp-1">
                    {chatData.name}
                </h1>
                <div
                    className={`w-[10px] h-[10px] rounded-full ${getBackgroundColor()} ${styleState ? 'animate-pulse' : ''} `}
                ></div>
                {!styleState ? (
                    <div className="text-md text-slate-500 relative -left-[1%]">
                        จะรีบติดต่อกลับทันที
                    </div>
                ) : (
                    ''
                )}
            </div>

            {readyChat ? (
                <h1 className="text-center text-slate-500"></h1>
            ) : (
                <Alert variant="filled" severity="error">
                    This is a filled error Alert.
                </Alert>
            )}

            <div className="w-full h-[calc(100%-136px)] py-2 px-4 overflow-y-auto">
                {historyMessage.length > 0 ? (
                    <h1 className="text-center text-slate-500">
                        {dayjs((historyMessage as Message[])[0]?.createdAt).format(
                            'D MMM YYYY'
                        )}
                    </h1>
                ) : (
                    <div className="text-center text-slate-500">
                       ข้อความล่าสุด
                    </div>
                )}

                {historyMessage.map((msg, index) => (
                    <div key={index}>
                        {Math.abs(
                            parseInt(
                                dayjs((msg as Message).createdAt).format('D')
                            )
                        ) -
                            parseInt(
                                dayjs(
                                    (historyMessage as Message[])[index - 1]
                                        ?.createdAt
                                ).format('D')
                            ) >
                            0 && (
                            <div>
                                <h1 className="text-center text-slate-500">
                                    {dayjs((msg as Message).createdAt).format(
                                        'D MMM YYYY'
                                    )}
                                </h1>
                            </div>
                        )}

                        <ChatMessage
                            message={(msg as Message).msg}
                            isSender={(msg as Message).senderId == userId}
                            timeStamp={(msg as Message).createdAt}
                        />
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="h-10 w-[98%] wborder-slate-300 flex items-center justify-between gap-2 p-1 pr-5 rounded-full bg-slate-100 mr-10 absolute left-[1%] bottom-[2%]">
                <textarea
                    id="textarea"
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                        setNewMessage(event.target.value);
                    }}
                    placeholder="Write Something"
                    className="w-[90%] h-full text-md text-slate-300 bg-slate-100 rounded-lg outline-none focus:text-black px-6 py-1 resize-none overflow-x-auto self-end"
                />
                {selectedImage && (
                    <div className="mt-2">
                        <Image
                            src={selectedImage}
                            alt="Selected Image Preview"
                            width={30}
                            height={30}
                        />
                    </div>
                )}
                <div className="w-[10%] flex items-center justify-end gap-2">
                    <IoMdSend
                        className="text-2xl text-redrice-blue hover:text-sky-800"
                        onClick={sendMessage}
                    />
                </div>
            </div>
        </div>
    );
}
