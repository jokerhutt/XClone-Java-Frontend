
import { useParams } from "react-router"
import { useState, useEffect } from "react";
import NotificationTemplate from "./NotificationTemplate";
import '../App.css'

function NotificationFeed ({userNotifications, currentUser}) {



    return (
    
        
        <div className="flex flex-col flex-grow">
            {currentUser && userNotifications ? (
            <div className="flex-[3] flex flex-col-reverse justify-end h-full w-full border-l-2  border-r-2 border-twitterBorder">
                {userNotifications.map((notification) => 
                <div className="pb-2 border-b-2 border-twitterBorder">
                    <NotificationTemplate notification={notification}currentUser={currentUser} />
                </div>
                )}
            </div>
            ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Notifications...</p>
            </div>
            )}
        </div>
        


    )
}

export default NotificationFeed;