import { useEffect, useState } from "react";

function ConvoPreview ({convo, currentUser}) {

    const [convoOtherUser, setConvoOtherUser] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [otherUserFirstName, setOtherUserFirstName] = useState(null);

    useEffect(() => {

        if (convo && currentUser) {

            if (convo.user1Id === currentUser.id) {
                    handleUser2Grabbing();
            } else if (convo.user2Id === currentUser.id) {
                    handleUser1Grabbing();
            }

        }

    }, [convo])

    useEffect(() => {
        if (convo) {
            const messageId = convo.lastMessageId;
            fetch(`http://localhost:6790/api/grabmessagebymessageid/${messageId}`)
            .then(response => response.json())
            .then((data) => setLastMessage(data))
            .then(console.log("CHECK7"))
            .catch(error => console.error(error));    
        }
    }, [convo])

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
        console.log("Other Convo user is: " + JSON.stringify(convoOtherUser))
    }, [convoOtherUser])

    useEffect(() => {
        console.log("Last Message is is: " + JSON.stringify(lastMessage))
    }, [lastMessage])

    function handleUser2Grabbing () {
        const profileUserId = convo.user2Id;
        fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setConvoOtherUser(data))
        .then(console.log("CHECK5"))
        .catch(error => console.error(error));
    }

    function handleUser1Grabbing () {
        const profileUserId = convo.user1Id;
        fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setConvoOtherUser(data))
        .then(console.log("CHECK6"))
        .catch(error => console.error(error));
    }

    return (
        <div className="w-full border-b-2 border-twitterBorder pl-4 py-4 hover:bg-twitterBorder hover:bg-opacity-50">
            {convoOtherUser && convo && otherUserFirstName ? (
                <div className=" flex w-full h-full">

                    <div className="flex-[25]">
                        <div>
                            <img src={convoOtherUser.profilePic} className="w-10 h-10 rounded-full"/>
                        </div>
                    </div>

                    <div className="flex-col flex-[75] text-white">
                        <div>
                            <p className="text-white font-bold">{otherUserFirstName}</p>
                        </div>

                        {lastMessage ? (
                            <div>
                                <p>{lastMessage.messageText}</p>
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
    )
}

export default ConvoPreview;