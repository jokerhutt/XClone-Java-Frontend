import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import IndividualMessage from "./IndividualMessage";
import ConvoPreview from "./ConvoPreview";

function MessageComponent ({hasMessages, setHasMessages, setMessageNotificationCache, messageNotificationCache, currentUser, sendMessage, socket, setConvoCache, convoCache, messageNotifications, refreshNotifications, userNotifications}) {

    const { userId, otherUserId } = useParams();
    const [messageText, setMessageText] = useState("");
    const [convoMessages, setConvoMessages] = useState([])
    const [userConvos, setUserConvos] = useState([]);
    const [currentConvo, setCurrentConvo] = useState(null);
    const [otherConvoUser, setOtherConvoUser] = useState(null);
    const [messageUpdater, setMessageUpdater] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        setHasMessages(false)
    }, [])

    useEffect(() => {
        console.log("Current socket state:", socket);
    }, [socket]);

    function handleMarkAsRead(readPayload) {
        console.log("MARKING AS READ")
        if (userId && otherUserId) {
            fetch("http://localhost:6790/api/markasread", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(readPayload),
              })
              .then((response) => response.json())
              .then(() => {
                console.log("BEEP BEEP BOOP DELETING")
                setMessageNotificationCache((prev) => {
                    const updatedCache = { ...prev };
                    console.log("THE BEFORE CACHE " + updatedCache)
                    delete updatedCache[readPayload.notificationObjectId];
                    console.log("THE AFTER CACHE " + updatedCache)
                    return updatedCache;
                })
                setHasMessages(false);
              }
            )
        }
    }

    function sendMessageToApp () {

        if (!messageText.trim()) {
            return;
        };

        const newMessagePayload = {
            senderId: userId,
            receiverId: otherUserId,
            messageText: messageText,
            notificationType: "MESSAGE"
        }

        sendMessage(newMessagePayload)

        setMessageText("");
    }

    useEffect(() => {
        if (currentUser && convoCache){ 
            const unpackedConvos = Object.values(convoCache).map(entry => entry.convo);
            setUserConvos(unpackedConvos)
        } 
    }, [currentUser, convoCache])
    
    useEffect(() => {
        if (userId && otherUserId && convoCache && currentUser) {
            const foundConvo = Object.values(convoCache).find(convo => 
                (convo.convo.user1Id === parseInt(userId) && convo.convo.user2Id === parseInt(otherUserId)) ||
                (convo.convo.user1Id === parseInt(otherUserId) && convo.convo.user2Id === parseInt(userId))
            );
            console.log("FOUND CONVO IS " + JSON.stringify(foundConvo))
            setCurrentConvo(foundConvo)   
        }
    }, [userId, otherUserId, convoCache, currentUser])

    useEffect(() => {
        if (currentConvo) {
            console.log("CURRENT CONVO IS " + JSON.stringify(currentConvo))
        }
    }, [currentConvo])


    // function handleConvoSwitch(convo) {

    //     const otherPackagedUserId = convo.user1Id === currentUser.id ? convo.user2Id : convo.user1Id;

    //     const newReadPayload = {
    //         notificationObjectId: convo.id,
    //         receiverId: currentUser.id,
    //         senderId: otherPackagedUserId,
    //         notificationType: "MESSAGE"
    //     }

    //     fetch('http://localhost:6790/api/markasread', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newReadPayload),
    //     })
    //     .then(response => response.json()) // Use response.json() to parse the response body as JSON
    //     .then(data => {
    //         console.log("Response Data: ", JSON.stringify(data)); // Log the parsed JSON response
    //         refreshNotifications();
    //     })
    //     .catch(error => {
    //         console.error("Error:", error);
    //     });

    // }


    //TODO
    function handleNewMessage() {
        const newMessagePayload = {
            senderId: userId,
            receiverId: otherUserId,
            messageText: messageText,
            notificationType: "MESSAGE"
        }
        fetch('http://localhost:6790/api/newmessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newMessagePayload),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to upload message');
            }
        })
        .then((data) => {
                alert('Post Upload successful!');
                setConvoMessages([...data]);
        })
        .then(() => {
            setTimeout(() => {
                refreshUserConvos();
            }, 50);
        })
    }



    return (
    <div className="flex flex-col max-h-screen flex-grow relative">

            <div className='h-14 py-3 w-full px-4 justify-start gap-5 flex border border-twitterBorder text-white absolute top-0 z-20 backdrop-blur-md bg-black bg-opacity-7'>
                <div className="w-8 ml-2 h-full flex justify-start text-lg items-center">
                    <FaArrowLeft onClick={() => navigate(-1)} className="hover:drop-shadow-[0_0_15px_#1C9BF0] hover:text-[#66C9FF] transition duration-300 hover:cursor-pointer"/>
                </div>
                <div className="flex items-center justify-start">
                    <h2 className='font-bold'>Messages</h2>
                </div>
            </div>

        <div className="flex w-full bg-none h-full">

            <div className="flex-[40] w-full border-x-2 border-twitterBorder flex flex-col">
                <div className="mt-14">
                {userConvos && currentUser ? (
                    <>
                        {userConvos.map((convo) => 
                                <div className="hover:cursor-pointer" onClick={() => navigate(`/messages/${currentUser.id}/${convo.user1Id === currentUser.id ? convo.user2Id : convo.user1Id}`)}>
                                    <ConvoPreview userId={userId} otherUserId={otherUserId} selectedConvo={currentConvo} handleMarkAsRead={handleMarkAsRead} messageNotificationCache={messageNotificationCache} currentUser={currentUser} convoOtherUser={convoCache[convo.id].otherUser} convo={convo} convoCache={convoCache}/>
                                </div>
                        )}   
                    </>
                ) : (
                    <div className="text-twitterBlue w-full flex justify-center items-center text-3xl animate-pulse">
                        <p>Loading Convo Previews...</p>
                    </div>
                )}
                </div>
            </div>

            <div className="flex-[60] w-full border-l border-r border-twitterBorder flex flex-col">
                
                <div className="flex-1 bg-black overflow-y-scroll scrollbar-thin">
                {currentConvo && currentUser ? (
                    <div className="">
                        {currentConvo.messages.map((message) => 
                        <IndividualMessage message={message} currentUser={currentUser}/>
                        )}   
                    </div>
                ) : (
                    <div className="text-white h-full w-full flex justify-center items-center">
                        <div className="flex h-full flex-col w-3/4 gap-2 justify-center">
                        <p className="text-2xl font-bold">Select a Message</p>
                        <p className="text-sm text-twitterBorder">Choose from your existing conversations, start a new one, or just keep swimming.</p>
                        </div>
                    </div>
                )}
                </div>

                <div className="h-14 w-full px-2 bottom-0 flex items-center border-t border-twitterBorder bg-black">
                    <div className="h-10 w-full p-2 flex bg-twitterBorder rounded-2xl">

                        <div className="flex w-full h-full gap-4 items-center pl-4 justify-end">
                            <input className="w-full bg-transparent border-none" placeholder="Start a new message" onChange={(e) => setMessageText(e.target.value)}/>
                            <IoMdSend className="text-twitterBlue text-xl" onClick={() => sendMessageToApp()}/>
                        </div>

                    </div>
                </div>



            </div>

        </div>
    </div>
    )
}

export default MessageComponent;