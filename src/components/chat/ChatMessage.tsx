'use client';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';// Assuming utc.ts is in the same directory
import timezone from 'dayjs/plugin/timezone';
import { motion } from 'framer-motion';
dayjs.extend(utc);
dayjs.extend(timezone);

interface Message {
    fromUserId: string;
    message: string;
    timeStamp: string;
}

const ChatMessage = ({
    message,
    isSender,
    timeStamp
}: {
    message: string;
    isSender: boolean;
    timeStamp:string
}) => {
    const [show,setshow]=useState(false)

    return (
        
        <div className={`flex  ${isSender ? 'justify-end ' : 'justify-start'} mb-2 relative items-center`}>

            {isSender && (<motion.div className={` text-sm text-gray-500  rounded-full h-[50%]  px-2 py-0 relative  bg-gray-700 opacity-100 flex justify-center items-center  ${show ? 'hidden ' : 'inline-block  '} ${isSender && '-left-[10px]'}`}   
                    initial={{ opacity: 0 }}  animate={{ opacity: show ? 0 : 1 }}  transition={{ duration: 0.5, delay: show ? 0 : 1 }}
            ><h1 className='leading-1 text-white '>{dayjs(new Date((timeStamp))).utc().tz('Asia/Bangkok').format('HH:mm') }</h1></motion.div> )  }
            
            <div className={`tablet:max-w-1/2 max-w-[70%]  rounded-lg p-3 flex   ${isSender ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`} onMouseOver={()=>{setshow(false)}} onMouseOut={()=>{setshow(false)} } onMouseLeave={()=>{setshow(true)}} >
                <div className={`  ${isSender ? ' text-white ' : ' text-gray-800 '} cursor-default`} >
                    {message}
                </div>
            </div>


            {!isSender && (<motion.div className={` text-sm text-gray-500  rounded-full h-[50%]  px-2 py-0 relative  bg-gray-700 opacity-100 flex justify-center items-center  ${show ? 'hidden ' : 'inline-block  '} ${!isSender &&  'left-[10px]'}`} 
                    initial={{ opacity: 1 }}  animate={{ opacity: show ? 0 : 1 }}  transition={{ duration: show ? 0.5 : 0, delay: show ? 0 : 1 }}
            ><h1 className='leading-1 text-white '>{dayjs(((timeStamp))).utc().tz('Asia/Bangkok').format('HH:mm') }</h1></motion.div> )  }
            
            
        </div>
    );
};

export default ChatMessage;

