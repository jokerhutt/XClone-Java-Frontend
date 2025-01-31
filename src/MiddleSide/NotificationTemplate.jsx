import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

import '../App.css'

function NotificationTemplate ({notification, currentUser, notificationObject, notificationSender}) {

    const [notificationReply, setNotificationReply] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const navigate = useNavigate();

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

    function findNotificationReplyObject () {
        if (notification.notificationType === "REPLY") {
            const notifReplyId = notification.notificationObject;
            const postReplyList = notificationObject.replyList;
            console.log("NOTIFICATION REPLY LIST POST IS " + JSON.stringify(postReplyList))
            const foundReplyObject = postReplyList.find((reply) => reply.id === notifReplyId)
            setNotificationReply(foundReplyObject);
        }
    }

    useEffect(() => {
        console.log("NOTIFICATION ITSELF IS " + JSON.stringify(notification))
        console.log("NOTIFICATION POST OBJECT IS " + JSON.stringify(notificationObject))
        if (notificationReply) {
            console.log("NOTIFICATION REPLY IS " + JSON.stringify(notificationReply))
        }
    }, [notificationReply])

    useEffect(() => {
        console.log("NOTIFICATION SENDER OBJECT IS " + JSON.stringify(notificationSender))
    }, [notificationSender])

    useEffect(() => {
        if (notification && notification.notificationType === "REPLY" && notificationObject && notificationObject.replyList) {
            findNotificationReplyObject();
        }
    }, [notification])



    return (
        <>
        {currentUser && notification && notificationSender && notificationObject? (
            <div>
            {notification.notificationType === "LIKE" ? (
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
            ) : notification.notificationType === "REPOST" && notificationObject ? (
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