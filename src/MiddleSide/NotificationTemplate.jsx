import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import '../App.css'

function NotificationTemplate ({notification, currentUser}) {

    const [notificationObject, setNotificationObject] = useState(null);
    const [notificationSender, setNotificationSender] = useState(null);
    const [notificationReply, setNotificationReply] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const navigate = useNavigate();

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
            } else if (notification.notificationType === "MESSAGE") {
                const messageId = notification.notificationObject;
                fetch(`http://localhost:6790/api/grabmessagebymessageid/${messageId}`)
                .then(response => response.json())
                .then(data => setNotificationMessage(data))
                .catch(error => console.error(error)); 
            }
        }
    },[currentUser, notification])

    function fetchReplyObject () {
        if (notificationReply) {
            const notificationPostId = notificationReply.replyObjectId;
            fetch(`http://localhost:6790/api/grabnotificationpost/${notificationPostId}`)
            .then(response => response.json())
            .then(data => setNotificationObject(data))
            .catch(error => console.error(error)); 
        }
    }

    useEffect(() => {
        if (notificationReply) {
            fetchReplyObject();
        }
    }, [notificationReply])

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

    const handlePostNavigation = () => {
        const postId = notificationObject.postId;
        navigate(`/post/${postId}`);
    }

    const handleProfileNavigation = () => {
        if (notificationSender) {
            const userID = notificationSender.id;
            navigate(`/${userID}`);
        }
    }



    return (
        <>
        {currentUser && notification && notificationSender ? (
            <div>
            {notification.notificationType === "LIKE" && notificationObject ? (
                <div
                onClick={() => handlePostNavigation()}
                className="hover:bg-twitterBorder hover:bg-opacity-50 hover:cursor-pointer w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

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
                <div onClick={() => handlePostNavigation()} className="w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

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
                <div onClick={() => handlePostNavigation()} className="hover:bg-twitterBorder hover:bg-opacity-50 hover:cursor-pointer w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

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
            ) : notification.notificationType === "FOLLOW" && notificationSender ? (
                <div onClick={() => handleProfileNavigation()} className="hover:bg-twitterBorder hover:bg-opacity-50 hover:cursor-pointer w-full h-full text-white flex pl-4 pr-4 pt-3 pb-3 flex-grow">
                    
                    <div className="pr-4">
                        <FaUser className="text-3xl text-twitterBlue"/>
                    </div>
                    <div className="flex-col flex gap-2 w-full h-full">
                        <div>
                            <img src={notificationSender.profilePic} className="h-8 rounded-full"/>
                        </div>
                        <div>
                            <p><span className="font-bold text-white">{notificationSender.displayName} </span> followed you</p>
                        </div>
                    </div>

                </div>
            ) : notification.notificationType === "MESSAGE" && notificationSender && notificationMessage ? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 pb-3 flex-grow">

                    <div className="pr-4">
                        <FaMessage className="text-green-400 text-3xl"/>
                    </div>

                    <div className="flex flex-col text-white flex-[12] gap-3">
                        <div>
                            <img src={notificationSender.profilePic} className="h-8 rounded-full"/>
                        </div>
                        <div>
                            <p> {notificationSender.displayName} Sent you a Message</p>
                        </div>
                        <div>
                            <p className="text-twitterBorder"> {notificationMessage.messageText} </p>
                        </div>
                    </div>
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