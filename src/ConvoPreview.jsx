import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import LastSeen from "./LastSeen";

function ConvoPreview ({userId, otherUserId, convo, selectedConvo, handleMarkAsRead, currentUser, convoCache, convoOtherUser, messageNotificationCache}) {

    const [lastMessage, setLastMessage] = useState(null);
    const [lastMessageTime, setLastMessageTime] = useState(null)
    const [otherUserFirstName, setOtherUserFirstName] = useState();
    const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

    useEffect(() => {
        if (convoOtherUser) {
            const myString = convoOtherUser.displayName;
            const myArr = myString.split(" ", 2);
            const firstName = myArr[0];
            console.log("first name is " + firstName)
            setOtherUserFirstName(firstName);
        }
    }, [convoOtherUser])

    useEffect(() => {
        if (messageNotificationCache) {
            console.log("MESSAGENOTIFCACHE IS " + JSON.stringify(messageNotificationCache))

            const unReadNotifications = messageNotificationCache[convo.id];
            if (unReadNotifications && unReadNotifications.length > 0) {
                console.log("CURRENT NOTIFICATIONS IS " + JSON.stringify(unReadNotifications))
                setHasUnreadNotifications(true)
            } else {
                setHasUnreadNotifications(false)
            }
        }
    }, [messageNotificationCache])

    useEffect(() => {
        if (lastMessageTime) {
            console.log("LAST MESSAGE TIMESTAMP IS " + JSON.stringify(lastMessageTime))

        }
    }, [lastMessageTime])

    useEffect(() => {
        if (messageNotificationCache[convo.id] && selectedConvo && selectedConvo.convo.id === convo.id){
            
            const readPayload = {
                notificationObjectId: convo.id,
                receiverId: currentUser.id,
                senderId: convoOtherUser.id,
                notificationType: "MESSAGE"
            }
            handleMarkAsRead(readPayload)
        }

    }, [messageNotificationCache, selectedConvo, userId, otherUserId])

    //This useEffect sets the last message, if the last message is received by the websocket it sets it to that, otherwise it uses
    //The last known message from the cache
    useEffect(() => {
        if (convo.lastMessageText) {
            console.log("CONVO IS " + JSON.stringify(convo))
            setLastMessage(convo.lastMessageText)
        } else {
            const currentConvo = convoCache[convo.id];
            console.log("CURRENT CONVO CACHE THING " + JSON.stringify(currentConvo))
            const currentConvoMessages = currentConvo.messages
            const currentLastMessageId = convo.lastMessageId;
            const foundMessage = currentConvoMessages.find((message) => message.id === currentLastMessageId)
            console.log("FOUND MESSAGE IS " + JSON.stringify(foundMessage))
            if (foundMessage && foundMessage.messageText) {
                setLastMessage(foundMessage.messageText)
            }
        }

        changeLastMessageCreatedAt()
    }, [convoCache, convo])

    function changeLastMessageCreatedAt () {
            if (convo && convo.lastMessageCreatedAt) {
                setLastMessageTime(convo.lastMessageCreatedAt)
            } else {
                const currentConvo = convoCache[convo.id];
                const currentConvoMessages = currentConvo.messages
                const currentLastMessageId = convo.lastMessageId;
                const foundMessage = currentConvoMessages.find((message) => message.id === currentLastMessageId)
                if (foundMessage) {
                    setLastMessageTime(foundMessage.createdAt)
                }
            }
    }


    //Sets first name of user in preview


    return (
        <>

        {hasUnreadNotifications === true ? (

            <div className="w-full border-b-2 border-twitterBorder pl-4 py-4 bg-twitterHover">
            {convoOtherUser && convo && otherUserFirstName ? (
                <div className=" flex w-full h-full">

                    <div className="flex-[25]">
                        <div>
                            <img src={convoOtherUser.profilePic} className="w-10 h-10 rounded-full"/>
                        </div>
                    </div>

                    <div className="flex-col flex-[75] text-white">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                                <p className="text-white font-bold">{otherUserFirstName}</p>
                                {lastMessageTime ? (
                                    <LastSeen locale="en-US" date={lastMessageTime}/>
                                ) : (
                                    null
                                )}
                            </div>
                            <div className="mr-6 text-twitterBlue">
                                <GoDotFill />
                            </div>
                        </div>

                        {lastMessage ? (
                            <div>
                                <p>{lastMessage}</p>
                            </div>
                        ) : (
                            <div>
                                <p>No messages yet!</p>
                            </div>   
                        )}
                    </div>
                </div>
            ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Preview...</p>
            </div>
            )}         
            </div>

        ) : selectedConvo && selectedConvo.convo.id === convo.id ? (
            <div className="w-full border-b-2 border-twitterBorder pl-4 py-4 bg-gray-300 bg-opacity-30">
            {convoOtherUser && convo && otherUserFirstName ? (
            <div className=" flex w-full h-full">
                    <div className="flex-[25] mr-4">
                        <div>
                            <img src={convoOtherUser.profilePic} className="w-8 h-8 md:w-10 md:h-10 rounded-full"/>
                        </div>
                    </div>

                    <div className="flex-col flex-[75] text-white">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                            <p className="text-white font-bold">{otherUserFirstName}</p>
                            {lastMessageTime ? (
                                <LastSeen locale="en-US" date={lastMessageTime}/>
                            ) : (
                                null
                            )}
                            </div>
                        </div>

                        {lastMessage ? (
                            <div>
                                <p>{lastMessage}</p>
                            </div>
                        ) : (
                            <div>
                                <p>No messages yet!</p>
                            </div>   
                        )}
                    </div>
                </div>
            ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Preview...</p>
            </div>
            )}         
            </div>
        ) : (

            <div className="w-full border-b-2 border-twitterBorder pl-4 py-4 hover:bg-twitterBorder hover:bg-opacity-50">
            {convoOtherUser && convo && otherUserFirstName ? (
                <div className=" flex w-full h-full">

                    <div className="flex-[25]">
                        <div>
                            <img src={convoOtherUser.profilePic} className="w-10 h-10 rounded-full"/>
                        </div>
                    </div>

                    <div className="flex-col flex-[75] pl-4 md:pl-0 text-white">
                            <div className="flex gap-2">
                                <p className="text-white font-bold">{otherUserFirstName}</p>
                                {lastMessageTime ? (
                                    <LastSeen locale="en-US" date={lastMessageTime}/>
                                ) : (
                                    null
                                )}
                            </div>

                        {lastMessage ? (
                            <div>
                                <p>{lastMessage}</p>
                            </div>
                        ) : (
                            <div>
                                <p>No messages yet!</p>
                            </div>   
                        )}
                    </div>
                </div>
            ) : (
                <div className=" flex w-full h-full">

                    <div className="flex-[25]">
                        <div>
                            <img src="/DEFAULTPFP.png" className="w-10 h-10 rounded-full"/>
                        </div>
                    </div>

                    <div className="flex-col flex-[75] text-white">
                        <div>
                            <p className="text-white font-bold">{otherUserFirstName}</p>
                        </div>
                            <div>
                                <p>No messages yet!</p>
                            </div>   
                    </div>
                </div>
            )}         
            </div>

        )}





        </>
    )
}

export default ConvoPreview;