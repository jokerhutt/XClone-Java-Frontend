import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import '../App.css'

function NotificationTemplate ({notification, currentUser}) {

    const [notificationObject, setNotificationObject] = useState(null);
    const [notificationSender, setNotificationSender] = useState(null);

    useEffect(() => {
        if (currentUser && notification) {
            if (notification.notificationType === "LIKE"){
                const notificationPostId = notification.notificationObject;
                fetch(`http://localhost:6790/api/grabnotificationpost/${notificationPostId}`)
                .then(response => response.json())
                .then(data => setNotificationObject(data))
                .catch(error => console.error(error)); 
            } else if (notification.notificationType === "REPOST") {
                const profileUserId = notificationObject.creatorId;
                fetch(`http://localhost:6790/api/grabrepost/${profileUserId}`)
                .then(response => response.json())
                .then(data => setNotificationObject(data))
                .catch(error => console.error(error)); 
            } else if (notification.notificationType === "MESSAGE") {
                null
            } else if (notification.notificationType === "COMMENT") {
                null
            }
        }
    },[currentUser, notification])

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

    return (
        <>
        {currentUser && notification && notificationObject && notificationSender ? (
            <div>
            {notification.notificationType === "LIKE" ? (
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
            ) : notification.notificationType === "REPOST" ? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 flex-grow">
                    <div>
                        
                    </div>
                    <div className="flex flex-col text-white flex-[12]">
                        <div>
                            <img src={notificationSender.profilePic}/>
                        </div>
                        <div>
                            <div>
                                <p> {notificationSender.displayName} reposted a post you made</p>
                            </div>
                            <div>
                                <p> {notificationObject.postText} </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : notification.notificationType === "MESSAGE" ? (
                <div className="w-full h-full flex pl-4 pr-4 pt-3 flex-grow">
                    <p>WIP</p>
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