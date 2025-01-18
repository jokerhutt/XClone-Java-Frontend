import { useEffect, useState } from "react";

function ConvoPreview ({convo, currentUser}) {

    const [convoOtherUser, setConvoOtherUser] = useState(null);

    useEffect(() => {

        if (convo && currentUser) {

            if (convo.user1Id === currentUser.id) {
                    handleUser2Grabbing();
            } else if (convo.user2Id === currentUser.id) {
                    handleUser1Grabbing();
            }

        }

    }, [convo])

    function handleUser2Grabbing () {
        const profileUserId = convo.user2Id;
        fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setConvoOtherUser(data))
        .then(console.log("CHECK5"))
        .catch(error => console.error(error));
    }

    function handleUser1Grabbing () {
        const profileUserId = convo.user2Id;
        fetch(`http://localhost:6790/api/grabusers/${profileUserId}`)
        .then(response => response.json())
        .then((data) => setConvoOtherUser(data))
        .then(console.log("CHECK6"))
        .catch(error => console.error(error));
    }

    return (
        <div className="w-full">
            {convoOtherUser && convo ? (
                <p className="text-white text-xl">{convoOtherUser.displayName}</p>
            ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Preview...</p>
            </div>
            )}
            
        </div>
    )
}

export default ConvoPreview;