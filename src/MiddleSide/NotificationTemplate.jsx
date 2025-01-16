import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";

import '../App.css'

function NotificationTemplate ({notification, currentUser}) {

    const [notificationObject, setNotificationObject] = useState(null);
    const [notificationSender, setNotificationSender] = useState(null);
    const [notificationReply, setNotificationReply] = useState(null);

    useEffect(() => {
        if (currentUser && notification) {
            if (notification.notificationType === "LIKE" || notification.notificationType == "REPOST"){
                const notificationPostId = notification.notificationObject;
                fetch(`http://localhost:6790/api/grabnotificationpost/${notificationPostId}`)
                .then(response => response.json())
                .then(data => setNotificationObject(data))
                .catch(error => console.error(error)); 
            } 
            else if (notification.notificationType === "REPLY") {
                const replyID = notification.notificationObject;
                fetch(`http://localhost:6790/api/grabreply/${replyID}`)
                .then(response => response.json())
                .then(data => setNotificationReply(data))
                .catch(error => console.error(error)); 
            } else if (notification.notificationType === "COMMENT") {
                null
            }
        }
    },[currentUser, notification])

    // useEffect(() => {
    //     if (notificationReply) {
    //         const notificationPostId = notificationReply.replyObjectId;
    //         fetch(`http://localhost:6790/api/grabnotificationpost/${notificationPostId}`)
    //         .then(response => response.json())
    //         .then(data => setNotificationObject(data))
    //         .catch(error => console.error(error)); 
    //     }
    // }, [notificationReply])

    useEffect(() => {

        if (notification) {
                const profileUserId = notification.senderId;
                fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
                .then(response => response.json())
                .then(data => setNotificationSender(data))
                .catch(error => console.error(error)); 
        }
    },[notificationObject, notification])

    useEffect(() => {
        console.log("Notifications object is: " + notificationObject)
    }, [notificationObject])

    useEffect(() => {
        console.log("Notifications sender user is: " + JSON.stringify(notificationSender))
    }, [notificationSender])

    useEffect(() => {
        console.log("Notification is: " + notificationObject)
    }, [notification])

    useEffect(() => {
        console.log("Notification Reply is: " + JSON.stringify(notificationReply))
    }, [notificationReply])



    return (
        <>
        {currentUser && notification && notificationSender ? (
            <div>
            {notification.notificationType === "LIKE" && notificationObject ? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

                    <div className="pr-4">
                    <FaHeart className="text-red-500 text-3xl"/>
                    </div>

                    <div className="flex flex-col text-white flex-[12] gap-3">
                        <div>
                            <img src={notificationSender.profilePic} className="h-8 rounded-full"/>
                        </div>
                        <div>
                            <p> {notificationSender.displayName} liked your post</p>
                        </div>
                        <div>
                            <p className="text-twitterBorder"> {notificationObject.postText} </p>
                        </div>
                    </div>

                </div>
            ) : notification.notificationType === "REPOST" && notificationReply ? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

                    <div className="pr-4">
                    <BiRepost className="text-green-400 text-3xl"/>
                    </div>

                    <div className="flex flex-col text-white flex-[12] gap-3">
                        <div>
                            <img src={notificationSender.profilePic} className="h-8 rounded-full"/>
                        </div>
                        <div>
                            <p> {notificationSender.displayName} reposted a post you made</p>
                        </div>
                        <div>
                            <p className="text-twitterBorder"> {notificationObject.postText} </p>
                        </div>
                    </div>

                </div>
            ) : notification.notificationType === "REPLY" && notificationReply && notificationSender? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

                    <div className="pr-4">
                        <img src={notificationSender.profilePic} className="h-8 rounded-full"/>
                    </div>

                    <div className="flex flex-col text-white flex-[12]">
                        <div>
                            <p className="text-twitterBorder"> <span className="font-bold text-white">{notificationSender.displayName}</span> @{notificationSender.username}</p>
                        </div>
                        <div>
                            <p className="text-twitterBorder"> Replying to <span className="text-twitterBlue">@{currentUser.username}</span> </p>
                        </div>
                        <div>
                            <p className="text-white"> {notificationReply.replyText} </p>
                        </div>
                    </div>

                </div>
            ) : notification.notificationType === "COMMENT" ? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 flex-grow">
                    <p>WIP</p>
                </div>
            ) : (
                null
            )}
        </div>
        ) : (
        <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
            <p>Loading Notification...</p>
        </div>
        )}
        
        </>
    )
}

export default NotificationTemplate;