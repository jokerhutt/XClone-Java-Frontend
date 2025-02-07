import { useNavigate } from "react-router-dom";
import { useParams } from "react-router"
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { TbBellRinging } from "react-icons/tb";
import clsx from 'clsx';
import NotificationTemplate from "./NotificationTemplate";
import '../App.css'

function NotificationFeed ({notificationCache, buttonColor, nonMessageNotifications, currentUser}) {
    const navigate = useNavigate();

    return (
    
        
        <div className="flex flex-col flex-grow relative">
        <div className='h-16 min-h-16 w-full px-4 justify-start sticky top-0 z-20 gap-5 flex border-b border-twitterBorder text-white backdrop-blur-md bg-opacity-7'>
                <div className="w-8 ml-2 h-full flex justify-start text-lg  items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className={clsx ("hover:drop-shadow-[0_0_15px_#1C9BF0] transition duration-300 hover:cursor-pointer", {
                        "hover:text-twitterRed": buttonColor === "twitterRed",
                        "hover:text-twitterBlue": buttonColor === "twitterBlue",
                        "hover:text-twitterYellow": buttonColor === "twitterYellow",
                        "hover:text-twitterPurple": buttonColor === "twitterPurple",
                    })}/>
                </div>
                <div className="flex items-center justify-start">
                    <h2 className='font-bold'>Notifications</h2>
                </div>
            </div>
            {currentUser && nonMessageNotifications && nonMessageNotifications.length > 0 ? (
            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder">
                {nonMessageNotifications.map((notification) => 
                <div className="border-b-2 border-twitterBorder">
                    <NotificationTemplate notificationSender={notificationCache[notification.id]?.notificationSender} notificationObject={notificationCache[notification.id]?.notificationPost} notification={notification} currentUser={currentUser}/>
                </div>
                )}
            </div>
            ) : nonMessageNotifications ? (
                <>
                    <div className='flex flex-col w-full h-full py-10 gap-4 items-center'>
                        <h1 className='text-2xl text-center text-gray-200 font-bold'>No notifications - yet</h1>
                        <div className='w-2/3'>
                        <p className='text-center text-twitterBorder'>From likes to Retweets and a whole lot more, this is where all the action happens.</p>
                        </div>
                    </div>
                </>
            ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Notifications...</p>
            </div>
            )}
        </div>
        


    )
}

export default NotificationFeed;