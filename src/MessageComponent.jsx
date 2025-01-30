import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import IndividualMessage from "./IndividualMessage";
import ConvoPreview from "./ConvoPreview";

function MessageComponent ({currentUser, messageNotifications, refreshNotifications, userNotifications}) {

    const { userId, otherUserId } = useParams();
    const [messageText, setMessageText] = useState("");
    const [convoMessages, setConvoMessages] = useState([])
    const [userConvos, setUserConvos] = useState([]);
    const [currentConvo, setCurrentConvo] = useState(null);
    const [otherConvoUser, setOtherConvoUser] = useState(null);
    const [messageUpdater, setMessageUpdater] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (userId && otherUserId) {

            fetch(`http://localhost:6790/api/conversations/${userId}/${otherUserId}`)
            .then(response => response.json())
            .then((data) => setCurrentConvo(data))
            .then(console.log("CHECK1"))
            .catch(error => console.error(error));
        }
    }, [userId, otherUserId, userNotifications])

    useEffect(() => {
        if (otherUserId) {
            console.log("other user ID is " + otherUserId)
            const profileUserId = otherUserId;
            fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
            .then(response => response.json())
            .then((data) => setOtherConvoUser(data))
            .then(console.log("CHECK2"))
            .catch(error => console.error(error));
        }
    }, [otherUserId, userNotifications])

    useEffect(() => {
        if (userId && otherUserId && currentConvo) {
            const convoId = currentConvo.id;
            fetch(`http://localhost:6790/api/grabmessagesbyconvoid/${convoId}`)
            .then(response => response.json())
            .then((data) => setConvoMessages([...data]))
            .then(console.log("CHECK3"))
            .catch(error => console.error(error));
        }
    }, [userId, otherUserId, currentConvo, messageNotifications, userNotifications])

    useEffect(() => {
        console.log("Convo messages is " + JSON.stringify(convoMessages))
    }, [convoMessages])

    useEffect(() => {
        if (userId) {
            refreshUserConvos();
        }
    }, [userId, otherUserId, userNotifications])

    function refreshUserConvos () {
        fetch(`http://localhost:6790/api/userconversations/${userId}`)
        .then(response => response.json())
        .then((data) => setUserConvos([...data]))
        .then(console.log("CHECK4"))
        .then(setMessageUpdater(!messageUpdater))
        .catch(error => console.error(error));
    }

    function handleConvoSwitch(convo) {

        const otherPackagedUserId = convo.user1Id === currentUser.id ? convo.user2Id : convo.user1Id;

        const newReadPayload = {
            notificationObjectId: convo.id,
            receiverId: currentUser.id,
            senderId: otherPackagedUserId,
            notificationType: "MESSAGE"
        }

        fetch('http://localhost:6790/api/markasread', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReadPayload),
        })
        .then(response => response.json()) // Use response.json() to parse the response body as JSON
        .then(data => {
            console.log("Response Data: ", JSON.stringify(data)); // Log the parsed JSON response
            refreshNotifications();
        })
        .catch(error => {
            console.error("Error:", error);
        });

    }


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
        <div className="flex w-full h-full bg-none">

            <div className="flex-[40] w-full h-full border-x-2 border-twitterBorder flex flex-col">
                <div className="flex-1 overflow-y-auto">
            {userConvos && currentUser && messageNotifications ? (
                    <>
                        {userConvos.map((convo) => 
                                <div className="hover:cursor-pointer" onClick={() => { handleConvoSwitch(convo); navigate(`/messages/${currentUser.id}/${convo.user1Id === currentUser.id ? convo.user2Id : convo.user1Id}`); }}>
                                    <ConvoPreview messageUpdater={messageUpdater} refreshNotifications={refreshNotifications} convoMessages={convoMessages} convo={convo} currentUser={currentUser} messageNotifications={messageNotifications}/>
                                </div>
                        )}   
                    </>
                ) : (
                    <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                        <p>Loading Convo Previews...</p>
                    </div>
                )}
                </div>
            </div>

            <div className="flex-[60] w-full h-full border-l-2 border-white flex flex-col">
                
                <div className="flex-1 overflow-y-auto bg-black scrollbar-thin">
                {convoMessages && currentUser ? (
                    <>
                        {convoMessages.map((message) => 
                        <IndividualMessage message={message} currentUser={currentUser}/>
                        )}   
                    </>
                ) : (
                    <div className="text-twitterBlue bg-red-50 h-full w-full flex justify-center items-center text-2xl animate-pulse">
                        <p>Select a Conversation</p>
                    </div>
                )}
                </div>

                <div className="h-10 w-full px-2">
                    <div className="h-10 w-full p-2 flex bg-twitterBorder rounded-2xl">

                        <div className="flex w-full h-full flex-[25]">

                        </div>

                        <div className="flex w-full h-full gap-4 items-center flex-[75] justify-end">
                            <input className="w-full bg-transparent border-none" placeholder="Start a new message" onChange={(e) => setMessageText(e.target.value)}/>
                            <IoMdSend className="text-twitterBlue text-xl" onClick={() => handleNewMessage()}/>
                        </div>

                    </div>
                </div>



            </div>

        </div>
    )
}

export default MessageComponent;