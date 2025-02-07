import { useEffect, useState } from "react";
import LastSeen from "./LastSeen";
import clsx from 'clsx';

function IndividualMessage ({message, buttonColor, currentUser, convoCache, currentConvoMessages, index}) {

    const [isLastMessage, setIsLastMessage] = useState(false)
    const [isVeryLastMessage, setIsVeryLastMessage] = useState(false)

    useEffect(() => {

        if (currentConvoMessages) {
            if (!currentConvoMessages[index + 1]) {
                setIsVeryLastMessage(true)
                setIsLastMessage(true)
            } else  if (currentConvoMessages[index + 1] && currentConvoMessages[index + 1].receiverId === currentConvoMessages[index].receiverId){
                setIsVeryLastMessage(false)
                setIsLastMessage(false)
            } else {
                setIsVeryLastMessage(false)
                setIsLastMessage(true)
            }
        }
    }, [currentConvoMessages, convoCache])

    return (
        <>
        {currentUser && message ? (
            <div className="pt-4">
                {message.senderId === currentUser.id ? (
                    <div className={`flex justify-end ${isVeryLastMessage ? "mb-4" : ""}`}>
                        <div className="flex flex-col">
                        <div className={clsx(`max-w-96 bg-twitterBlue rounded-tr-3xl rounded-tl-3xl text-white rounded-bl-3xl px-2 text-right mx-2 ${isVeryLastMessage ? "mb-4" : ""}`, {
                            "bg-twitterRed": buttonColor === "twitterRed",
                            "bg-twitterBlue": buttonColor === "twitterBlue",
                            "bg-twitterYellow": buttonColor === "twitterYellow",
                            "bg-twitterPurple": buttonColor === "twitterPurple",
                        })}>
                            <p className="px-4 py-2">{message.messageText}</p>
                        </div>
                        {isLastMessage && message.createdAt ? (
                            <div className="pr-2 flex w-full justify-end">
                                <LastSeen locale="en-US" date={message.createdAt}/>
                            </div>
                            ) : (
                            null
                        )}
                        </div>
                    </div>
                ) : (
                    <div className={`flex justify-start ${isVeryLastMessage ? "mb-10 md:mb-4" : ""}`}>
                        <div className="flex flex-col">
                        <div className={`max-w-96 bg-twitterBorder rounded-tr-3xl rounded-tl-3xl rounded-br-3xl text-white px-2 mx-2 text-left`}>
                            <p className="px-4 py-2">{message.messageText}</p>
                        </div>
                        {isLastMessage && message.createdAt ? (
                            <div className="pl-2">
                                <LastSeen locale="en-US" date={message.createdAt}/>
                            </div>
                            ) : (
                                null
                            )}
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="text-twitterBlue h-full w-full flex justify-center items-center text-3xl animate-pulse">
                <p>Loading Message...</p>
            </div>
        )}
        </>
    )
}

export default IndividualMessage;